import express from 'express';
import { connectToDB } from './db/db.js'; 
import cors from 'cors';
import routes from './routes/route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Connect to the database
connectToDB()
	.then(() => {
		console.log('MongoDB connected successfully');
		// Start server only after successful database connection
		const port = process.env.PORT || 3000; 
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
		process.exit(1); // Exit process on connection failure
	});

// API routes (handled in separate routes file)
app.use(routes);

export default app;
