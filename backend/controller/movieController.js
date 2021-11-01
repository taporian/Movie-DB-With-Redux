import Movie from "../model/movieModel.js";
import exists from "../validation/exists.js";
import movieValidation from '../validation/movieValidation.js'

// @routes  POST  /api/getallmovies
// @desc get all movies

export const getAllMovies = async (req,res) => {
    try{
        const readMovie= await Movie.find();
        if(!readMovie) throw Error('No Movies');
        res.status(200).json(readMovie);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
}

// @routes  POST  /api/getallmovies
// @desc get Movie by ID

export const getOneMovie = async (req,res) => {
    try{
        const readOneMovie= await Movie.findById(req.body.id);
       
        if(!readOneMovie) throw Error('No Movies');
        res.status(200).json(readOneMovie);

    }
    catch(err){
        res.status(400).json({msg:err})
    }
}


// @routes  POST  /api/addmovie
// @desc add a Movie

export const addMovie = async (req,res)=>{
      


    const { errors, isValid } = await movieValidation(req.body,false);
   
    if(!isValid) {
        return res.json({
            movieMessageExists:errors
        });
    }
    const movieExists = await Movie.findOne({title: req.body.title})
  
    if(!movieExists){
        try {
            let newMovie = new Movie({
                title: req.body.title.toLowerCase(),
                year: req.body.year ,
                rating: req.body.rating,
                description: req.body.description
            });
            newMovie  = await newMovie.save()
            res.status(201).json(
                {   message:"movie created",
                    data:newMovie
                }
                )
        } catch(err){
            res.json({
                messageRest:err.message })
        }
    }
    else{
        res.json({movieMessageExists:"Movie already Exists" })
    }
    
};

// @routes  UPDATE  /api/updatemovie
// @desc update A Movie

export const updateMovie = async(req,res) =>{

  
 
    try{  
        const readMovie= await Movie.find();
        const movies = readMovie.filter((item)=> item._id != req.body.id)
        const existsfilter = movies.filter((item)=> 
        
        item.title == req.body.title.toLowerCase()
        )
      
 
        if(existsfilter.length>0){
            throw  Error("title already Exists");
        }
        const getMovieToUpdate = await Movie.findById(req.body.id); //Get Movie To Update
        const oldTitle = getMovieToUpdate.title;

        const updatingMovie = await Movie.findByIdAndUpdate(req.body.id,req.body);
        const updatedMovie = await Movie.findById(req.body.id); //Get New Movie
        updatedMovie.title = updatedMovie.title.toLowerCase();
     
        const data = await updatedMovie.save();
        const newTitle = updatedMovie.title; 
            
        if(!updatingMovie) throw Error('Something went wrong while updating the movie')
        res.status(200).json({
            data:data,
            message:oldTitle+' was update to '+newTitle,
            success:true
                 })  
      }
      catch(err){
        res.status(200).json({
            success:false,
            msg:err.message})
      }
    
}



// @routes  DELETE  /api/deletemovie
// @desc delete A Movie

export const deleteMovie = async(req,res) =>{
    try{
     
        const deletedMovie = await Movie.findByIdAndDelete(req.body.id);
        const oldMovieIdDeleted = deletedMovie._id;
      
        if(!deletedMovie) throw Error('No post found!')
        res.status(200).json(
            {success:true,
            message:'the movie '+deletedMovie.title+' was deleted',
            id:oldMovieIdDeleted
             })
      }
      catch(err){
        res.status(400).json({
        msg:'the movie '+req.body.title+' does not exist',
        status:500  //handle error in the front
                            })
      }
}

 
    
export const searchMovie = async (req,res,next) =>{
      

const isnumb =  new RegExp(/^\d+$/);
const numbers = isnumb.test(req.body.search)

    try{
        if(numbers){
            const searched = req.body.search;
        
                if(searched>=100){
                    const findYear = await Movie.find({year:searched})
                    return res.json({ data:findYear})
                }
                else{
                    const findRating = await Movie.find({rating:searched})
                    return res.json({ data:findRating})}
                }
        else        {
           const findTitleDesc = await Movie.find({
                '$or':[
                    { title: { $regex: req.body.search.toLowerCase(), $options: 'i' } },
                    { description: { $regex: req.body.search.toLowerCase(), $options: 'i' } },
                ] 
            })
            return res.json({ data:findTitleDesc})}
    }
    catch(error){
        res.json({msg:err})
    }
    }
 