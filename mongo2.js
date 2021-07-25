const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('Correct format: node mongo.js <password> <name> <number>');
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

const password = process.argv[2];

const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://testowyuser:${password}@cluster0.6t3yw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
  date: '01:01:2010',
});

person.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`);
  mongoose.connection.close();
});
