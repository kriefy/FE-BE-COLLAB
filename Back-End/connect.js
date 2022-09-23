const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://localhost/mahasiswa',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const Mahasiswa = new Schema({
  nim: {
    type: String,
    unique: true,
    required: true
  },
  namestudent: {
    type: String,
    required: true
  },
  role: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('mahasiswaData', Mahasiswa, 'mahasiswaData');