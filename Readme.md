# E-commerce Marketplace REST API

This project implements a REST API for an e-commerce marketplace using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows buyers and sellers to register and login, manage catalogs, create orders, and view order history.

## Getting Started

To get started with this project, follow the instructions below:

### Prerequisites

- Node.js and npm installed on your machine.
- Online MongoDB URL Added.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install backend dependencies.


### Running the Application

1. Start the backend server: PORT = 3000
2. Use Postman Import for geting APIs

## API Endpoints

### Authentication APIs

- `POST /api/auth/register`: Register a user (accept username, password, type of user - buyer/seller).
- `POST /api/auth/login`: Let a previously registered user log in (e.g., retrieve authentication token).

### APIs for Buyers

- `GET /api/buyer/list-of-sellers`: Get a list of all sellers.
- `GET /api/buyer/seller-catalog/:seller_id`: Get the catalog of a seller by seller_id.
- `POST /api/buyer/create-order/:seller_id`: Send a list of items to create an order for seller with id = seller_id.

### APIs for Sellers

- `POST /api/seller/create-catalog`: Send a list of items to create a catalog for a seller.
- `GET /api/seller/orders`: Retrieve the list of orders received by a seller.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Authors

- Shivansh Vasu

## Acknowledgments
-Project done by - SHIVANSH VASU for HYBR1D

