import Movie from "../model/movieModel.js";





const  exists =  async (value) => {
   
   

        try{
          
            const titleExists = await Movie.findOne({title:value.toLowerCase()});
        
         
        
            if(titleExists != null){
             
                return true
            }
            else{
               
               return false
            }
        }
       catch(error){
           
       }
        
        
  
   
}


export default exists;