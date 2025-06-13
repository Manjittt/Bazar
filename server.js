import express from 'express';
import dbConnection from './config/db';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); 

// Connect to the database
dbConnection(); 

// Create an Express application

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
    }
);

 const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

