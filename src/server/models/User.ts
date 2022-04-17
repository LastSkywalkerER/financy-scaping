import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    // required: true,
    unique: true,
  },
  tgChatId: {
    type: Number,
    unique: true,
  },
  // purchasedTokens: [
  //   {
  //     type: Types.ObjectId,
  //     ref: 'purchasedToken',
  //   },
  // ],
});

export default model('User', schema);
