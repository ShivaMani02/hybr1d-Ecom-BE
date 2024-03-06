import mongoose from 'mongoose';
const url =
	'mongodb+srv://shivanshphone:shivanshphone@cluster0.hmne0uc.mongodb.net/hybr1dEcom?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your connection string

export const connectToDB = async () => {
	const client = await mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
