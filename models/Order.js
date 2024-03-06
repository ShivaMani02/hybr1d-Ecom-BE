// Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
	buyer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
	],
	totalPrice: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Order', orderSchema);
