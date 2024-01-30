const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://whatstool:whatstool@cluster0.fmxeqtu.mongodb.net/whatstool?retryWrites=true&w=majority")

module.exports = {connection};