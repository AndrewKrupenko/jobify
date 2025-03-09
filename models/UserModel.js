import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: String,
  avatarPublicId: String,
})

// toJSON method is called every time we send the user object in the response
UserSchema.methods.toJSON = function () {
  const obj = this.toObject() // Convert Mongoose document to plain JS object
  delete obj.password

  return obj // Return the object without the password field
}

export default mongoose.model('User', UserSchema)
