import mongoose from 'mongoose';
import { PasswordManager } from '../services/password-manager';

// interface that describes the properties necessary for creating an User
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false,
  }
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };