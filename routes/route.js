import express from 'express';
import User from '../models/User.js';
import Catalog from '../models/Catalog.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import bcrypt from 'bcryptjs'; // For password hashing 
import cors from 'cors'; // For enabling CORS
import jwt from 'jsonwebtoken'; // For generating authentication tokens
const router = express.Router();
const SECRET_KEY='secretkeybySHivansh12345yuhdvsuidhskldz';
// Middleware
router.use(cors());

// Authentication Routes
router.post('/api/auth/register', async (req, res) => {
	const { username, password, type } = req.body;

	try {
		// Check for existing username
		const existingUser = await User.findOne({ username });
        console.log(existingUser);
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const user = new User({
			username,
			password: hashedPassword,
			type,
		});

		await user.save();

		// Generate authentication token
		const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
			expiresIn: '1h',
		}); 

		res.json({ message: 'Registration successful', token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/api/auth/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find user by username
		const user = await User.findOne({ username });
        console.log(user);
		if (!user) {
			return res
				.status(401)
				.json({ message: 'user not find' });
		}

		// Compare password hashes
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "not matched" });
		}

		// Generate authentication token
		const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
			expiresIn: '1h',
		}); 

		res.json({ message: 'Login successful', token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});
// Buyer Routes
router.get('/api/buyer/list-of-sellers', async (req, res) => {
	try {
		const sellers = await User.find({ type: 'seller' });
		res.json(sellers);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

router.get('/api/buyer/seller-catalog/:seller_id', async (req, res) => {
	const sellerId = req.params.seller_id;
	try {
		const catalog = await Catalog.findOne({ seller: sellerId }).populate(
			'products'
		);
		if (!catalog) {
			return res
				.status(404)
				.json({ message: 'Seller catalog not found' });
		}
		res.json(catalog);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/api/buyer/create-order/:seller_id', async (req, res) => {
	const sellerId = req.params.seller_id;
	const { items } = req.body;

	if (!items || !items.length) {
		return res
			.status(400)
			.json({ message: 'Missing or empty order items' });
	}

	try {
		const seller = await User.findById(sellerId);
		if (!seller) {
			return res.status(404).json({ message: 'Seller not found' });
		}

		const validProducts = await Product.find({ _id: { $in: items } }); 
		if (validProducts.length !== items.length) {
			return res.status(400).json({
				message: 'Invalid or non-existent product IDs in order items',
			});
		}

		const totalPrice = validProducts.reduce(
			(acc, product) => acc + product.price,
			0
		);

		const order = new Order({
			buyer: req.user._id, 
			seller: sellerId,
			items: items,
			totalPrice: totalPrice,
		});

		await order.save();
		res.json({ message: 'Order created successfully', order });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

// Seller Routes
router.post('/api/seller/create-catalog', async (req, res) => {
	const { products } = req.body;

	if (!products || !products.length) {
		return res
			.status(400)
			.json({ message: 'Missing or empty catalog products' });
	}

	try {
		const existingCatalog = await Catalog.findOne({ seller: req.user._id }); 

		if (!existingCatalog) {
			const newCatalog = new Catalog({
				seller: req.user._id,
				products: products,
			});
			await newCatalog.save();
			return res.json({
				message: 'Catalog created successfully',
				catalog: newCatalog,
			});
		}

		const existingProductIds = existingCatalog.products.map(
			(product) => product._id
		);
		const newProductIds = products.filter(
			(productId) => !existingProductIds.includes(productId)
		);

		if (newProductIds.length) {
			const newProducts = await Product.find({
				_id: { $in: newProductIds },
			});
			existingCatalog.products.push(...newProducts);
			await existingCatalog.save();
			return res.json({
				message: 'Catalog updated successfully',
				catalog: existingCatalog,
			});
		}
		res.json({ message: 'Catalog already exists' }); 
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server} error' });
	}
});

router.get('/api/seller/orders', async (req, res) => {
	try {
		const orders = await Order.find({ seller: req.user._id }).populate(
			'items'
		);
		res.json(orders);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

export default router;
