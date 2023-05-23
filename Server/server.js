const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require("morgan");
const furnitureRoute = require('./routes/furnitures');
const userRoute = require('./routes/users.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'johndoe123';
const hash = '$2b$10$Jjo4NW1a9bozYnLUlBlk.epah4yfwt8oMoshTeHUomotHEDi1JZaG';


dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Mongo DB !');
    } catch (error) {
        console.log(error);
    }
}

connect();

const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

// Routes
app.use('/user', userRoute);


app.listen(port, () => {
    console.log(`L'application est en écoute sur http://localhost:${port}`);
});