import mongoose from 'mongoose';
// import User from './User';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  
  // This links the Post to the User model
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });


export default mongoose.models.Post || mongoose.model('Post', postSchema);
