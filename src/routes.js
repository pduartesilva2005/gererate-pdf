const { Router } = require('express');
const ejs = require('ejs');
const pdf = require('html-pdf');

const routes = Router();

routes.get('/', (request, response) => {
  ejs.renderFile('./views/index.ejs', { name: 'Pedro Duarte' }, (err, html) => {
    if (err) {
      return response.status(500).json({
        message: 'Internal Server Error'
      });
    }

    const options = {
      format: 'A4',
      border: {
        right: '8'
      }
    };

    pdf
      .create(html, options)
      .toFile(`./uploads/${Date.now()}.pdf`, (err, res) => {
        if (!err) {
          return response.json({ message: 'PDF Generated' });
        } else {
          return response.status(400).json({
            message: 'Error to generating PDF'
          });
        }
      });
  });

  return response.json({ message: 'Hello World' });
});

module.exports = routes;
