import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
});

// Check if the model exists before creating a new one (important for Next.js)
export default mongoose.models.User || mongoose.model('User', UserSchema);
