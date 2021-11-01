import express  from "express";
import mongoose from "mongoose";

import key from './db/config.js';
import authRouter from './router/api/auth.js';
import applyPassportStrategy  from "./middleware/passport.js";
import passport from 'passport';
import cors from 'cors';
//Connect to MongoDB 
mongoose.connect(key.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, }).then(
    () => {console.log('Connected to Movie DB') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(
	cors()
);
// Authorization 
applyPassportStrategy(passport);
app.use(passport.initialize());

const PORT = process.env.PORT || 5000 ;

    app.use(express.json());
    app.use("/api",authRouter);
    

    app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}` );
    });

   