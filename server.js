import express from 'express';
import dbConnection from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routers/authRouter.js';


const app = express();

// Load environment variables from .env file
dotenv.config(); 

// Connect to the database
dbConnection(); 


app.use(express.json()); 


app.use("/api/v1/auth", authRouter);

// Initialize morgan for logging HTTP requests
app.use(morgan("dev"));

// Create an Express application



app.get('/', (req, res) => {
    res.send('Hello, World!');
    }
);

 const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

