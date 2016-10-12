'use strict';
// controller is required
const controller = require('lib/wiring/controller');
// models is reqired
const models = require('app/models');
// go to models file and example function
const Example = models.example;
// go t authenticate require
const authenticate = require('./concerns/authenticate');

// index method
const index = (req, res, next) => {
  // Go to models and run the find method.
  Example.find()
  // if no error passes j.son response response
    .then(examples => res.json({ examples }))
// propogate errors
    .catch(err => next(err));
};
// show method
const show = (req, res, next) => {
// to go Examples model and find the example by the requested ID
  Example.findById(req.params.id)
// find the instances of id requring it.
    .then(example => example ? res.json({ example }) : next())
// propogate errors
    .catch(err => next(err));
};
// create method
const create = (req, res, next) => {
  // use the "example" data from the request body
  let example = Object.assign(req.body.example, {
    _owner: req.currentUser._id,
  });
   // Create the example
  Example.create(example)
  // if the example was created successfully, render the example as json
    .then(example => res.json({ example }))
    .catch(err => next(err));
};
// update method
const update = (req, res, next) => {

  // set up a search object, set _id to the id from the URL,  set _owner to the current user
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  //to go Examples model and find an example mathing search parameters
  Example.findOne(search)
  //if there's no matching example, move on to next()
    .then(example => {
      if (!example) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      // update the example with the data from the request body curl request
      return example.update(req.body.example)
      // send back a 200 code if it gets what it wants otherwise throw error
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

//destroy method
const destroy = (req, res, next) => {
  // set up a search object, set _id to the id from the URL,  set _owner to the current user
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  //to go Examples model and find an example mathing search parameters
  Example.findOne(search)
  //if there's no matching example, move on to next()
    .then(example => {
      if (!example) {
        return next();
      }
// use remove method
      return example.remove()
      // send code 200
        .then(() => res.sendStatus(200));
    })
    // if not 200 send error
    .catch(err => next(err));
};
// export these methods so other files can access
module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  // 
  { method: authenticate, except: ['index', 'show'] },
], });
