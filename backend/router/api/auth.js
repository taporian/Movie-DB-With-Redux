import express from 'express';
import key from '../../db/config.js'
import Movie from '../../model/movieModel.js'

import { createUser,signInUser,getUser } from '../../controller/userController.js'

import { addMovie ,updateMovie,getAllMovies,deleteMovie,getOneMovie,searchMovie} from '../../controller/movieController.js';
import passport from 'passport';

const router = express.Router();
router.post("/signIn",signInUser);
router.post("/signUp",createUser);
router.get("/getallmovies",getAllMovies);
//Authorization in the API

router.use((req,res,next)=>{
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if(err || !user){
            res.status(401).json({
                success:false,
                message:"Unauthorized"})
        }
        else{
            next();
        }
    })(req,res,next)
})






router.post("/getonemovie",getOneMovie);
router.post('/searchmovie',searchMovie);


router.get('/me', getUser);
router.post("/addmovie",addMovie);
router.put('/updatemovie',updateMovie);
router.delete('/deletemovie',deleteMovie);


export default router;

