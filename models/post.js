var mongoose = require('mongoose');

var postModel = function () {
  var schema = mongoose.Schema({
    link: String,
    info: String,
    description: String,
    lat: Number,
    lon: Number
  });

  schema.methods.getPlace = function () {
    return this.info.substring(info.lastIndexOf("@ ") + 2, info.length);
  }
  schema.methods.getDate = function () {
    return this.info.substring(info.lastIndexOf("- ") + 2, info.lastIndexOf(" @"));
  }
  schema.methods.getTitle = function () {
    return this.info.substring(15, info.lastIndexOf(" -"));
  }
  return mongoose.model('Post', schema);
};

module.exports = new postModel();
