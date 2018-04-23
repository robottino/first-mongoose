const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected');
  var newDish = Dishes ({
    name: 'Roberto',
    description: 'tets'
  });

  newDish.save()
  .then((dish) => {
    console.log(dish);
    return Dishes.find({}).exec();
  })
  .then((dishes) => {
    console.log(dishes);
    return mongoose.connection.db.dropCollection('dishes');
  })
  .then(()=>{
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

});
