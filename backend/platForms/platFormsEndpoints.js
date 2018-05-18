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

platFormsRouter.get('/:companyid', (req, res) => {
    const { companyid } = req.params;
    platForms
      .getByCompanyID(companyid)
      .then(platForms => {
          res.status(200).json(platForms);
      })
      .catch(error => {
          res.status(400).json(error);
      });
  });

// Using bitly to get shortURLs for long-URLs per companyID
platFormsRouter.get('/:id/shortURLs', (req, res) => {
    const { id } = req.params;
    platForms
      .get(id)
      .then(platForm => {
            return bitly.shorten(platForm.url)
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(error => {
                    res.status(400).json(error);
                });
        })
        .catch(error => {
            res.status(400).json(error);
        });
});

// Using bitly to get shortURLs for long-URLs per companyID; get clicks stat after get the shortURL
platFormsRouter.get('/:id/shortURLs/clicks', (req, res) => {
    const { id } = req.params;

    platForms
      .getByCompanyID(id)
      .then(platForms => {
        const promises = platForms.map(platForm => {
            return bitly.shorten(platForm.url)
                .then((result) => {
                    return bitly.clicks(result.data.url)
                        .then(result => {
                            console.log(result);
                            return result.data.clicks;
                        }) 
                })
                .catch(error => {
                    console.error(error);
                });
        }); 

        Promise.all(promises)
            .then(results => {
                res.status(200).json(results);
            });  
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

platFormsRouter.get('/:id/shortURLs/referrers', (req, res) => {
    const { id } = req.params;

    platForms
      .getByCompanyID(id)
      .then(platForms => {
        const promises = platForms.map(platForm => {
            return bitly.shorten(platForm.url)
                .then((result) => {
                    return bitly.referrers(result.data.url)
                        .then(result => {
                            console.log(result);
                            return result.data;
                        }) 
                })
                .catch(error => {
                    console.error(error);
                });
        }); 

        Promise.all(promises)
            .then(results => {
                res.status(200).json(results);
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