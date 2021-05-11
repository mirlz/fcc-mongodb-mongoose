require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }
  console.log('Connected to database');
});

var personSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: { 
    type: [String],
  }
});

var Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const user = new Person({
    name: 'Mirlz',
    age: 30,
    favoriteFoods: ['burger', 'nasi lemak', 'pizza']
  });
 
  user.save((err, data) => {
    if(err) return console.log(err);

    done(err, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    done(err, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    done(err , personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    done(err , personFound);
  })
};

const findPersonById = async(personId, done) => {
  try {
    const personFound = await Person.findById({ _id: personId });
    done(null , personFound);
  } catch (err) {
    done(err , null);
  }
};

const findEditThenSave = async(personId, done) => {
  const foodToAdd = "hamburger";

  try {
    const personFound = await Person.findById({ _id: personId });
    if(!personFound) {
      return console.log('Such person does not exist!');
    }
    personFound['favoriteFoods'].push(foodToAdd);

    const update = await personFound.save();
    done(null , update);
  } catch (err) {
    done(err , null);
  }
};

const findAndUpdate = async(personName, done) => {
  try {
    const ageToSet = 20;
    const personFound = await Person.findOneAndUpdate({ name: personName}, {age: ageToSet}, { new: true});
    done(null , personFound);
  } catch (e) {
    done(e, null);
  }
};

const removeById = async(personId, done) => {
  try {
    const person = await Person.findByIdAndRemove(personId);
    done(null, person);
  } catch(e) {
    done(e, null);
  }
};

const removeManyPeople = async(done) => {
  try {
    const nameToRemove = "Mary";
    const deleted = Person.deleteMany({name: nameToRemove});

    console.log('DELETED: ', deleted);
    done(null, deleted);
  } catch (e) {
    done(e, null);
  }
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
