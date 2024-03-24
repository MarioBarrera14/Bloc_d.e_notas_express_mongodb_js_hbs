const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

// Cambiamos el nombre del método a matchPassword
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
