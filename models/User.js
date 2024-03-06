// User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false
	},
	type: {
		type: String,
		required: true,
		enum: ['buyer', 'seller'],
	},
});



export default mongoose.model('User', userSchema);
