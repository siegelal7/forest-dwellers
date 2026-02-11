import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  password: { type: String, required: true }, // This will be hashed
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
