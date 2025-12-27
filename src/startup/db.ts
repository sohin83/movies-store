import mongoose from 'mongoose';

export default function connectDB() {
   const db = process.env.MONGO_URI || 'mongodb://localhost:27017/newvidly';
   mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
}
