require('dotenv').config();

const express = require('express');
const BitlyClient = require('bitly');

const bitly = BitlyClient(process.env.BITLY_ACCESS_TOKEN);

const platForms = require('./platFormsControllers');
const platFormsRouter = express.Router();

platFormsRouter.post('', (req, res) => {
    const platForm = req.body;
    platForms
      .insert(platForm)
      .then(id => {
          res.status(200).json(id);
      })
      .catch(error => {
          res.status(400).json(error);
      });
});

platFormsRouter.get('', (req, res) => {
  platForms
    .get()
    .then(platForms => {
        res.status(200).json(platForms);
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

// Using bitly to get shortURL for long-URL
platFormsRouter.get('/:id/shortURL', (req, res) => {
    const { id } = req.params;

    platForms
      .get(id)
      .then(platForm => {
        const shortURL = '';
        bitly.shorten(platForm.url)
            .then((result) => {
                console.log(result);
                res.status(200).json(result.data.url);
            })
            .catch((error) => {
                console.error(error);
            });
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

platFormsRouter.put('/:id', (req, res) => {
  const id = req.params.id;

  platForms
    .update(id, req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ updated: count });
        } else {
            res.status(404).json(null);
        }
    })
    .catch(function(error) {
        res.status(500).json({ error });
    });
});


platFormsRouter.delete('/:id', (req, res) => {
  const id = req.params.id;

  platForms
    .remove(id)
    .then(function(count) {
        res.status(200).json({ count });
    })
    .catch(function(error) {
        res.status(500).json({ error });
    });
});

module.exports = platFormsRouter;