const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected');
  Dishes.create ({
    name: 'Roberto',
    description: 'tets'
  })
  .then((dish) => {
    console.log(dish);
    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {description: 'Updated test'}
    }, {
      new: true
    }).exec();
  })
  .then((dish) => {
    console.log(dish);
    dish.comments.push({
      rating: 5,
      comment: 'interesting comment',
      author: 'Roby'
    });
    return dish.save();
  })
  .then((dish) => {
    console.log(dish);
    return mongoose.connection.db.dropCollection('dishes');
  })
  .then(()=>{
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

});
