import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  position: String,
  age: Number,
  disability: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

export default User; 