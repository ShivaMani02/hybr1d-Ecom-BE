// Catalog.js
import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
});

export default mongoose.model('Catalog', catalogSchema);
