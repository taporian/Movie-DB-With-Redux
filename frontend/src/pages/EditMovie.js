import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovie,deleteMovie,toggleEdit} from '../redux/action-creators';

import { StyledButton}  from "../components/styled/Button.style";
import { Table } from "../components/Table";


import UpdateMovies from "../components/UpdateMovie";

const EditMovie = () => {
    
  const dispatch = useDispatch();
 
  const  { movieData } = useSelector((state) =>  state.fetchMoviesReducer);
  const  {movieDataOne}  = useSelector((state) =>  state.fetchOneMoviesReducer);
const {error} = useSelector((state) =>  state.updateMoviesReducer);
  const   edit  = useSelector((state) =>  state.toggleEditreducer);



  useEffect(() => {
   
   dispatch( fetchMovie());
  
   
}, [dispatch]);


  return (
    
    <div>
 
{movieDataOne && <p>{movieDataOne.msg}</p>}

{edit ? <Table>
  <Table.Head>
    <Table.TR>
      <Table.TH>Title</Table.TH>
      <Table.TH>Year</Table.TH>
      <Table.TH>Rating</Table.TH>
      <Table.TH>Description</Table.TH>
      <Table.TH>Edit</Table.TH>
      <Table.TH>Delete</Table.TH>
    
    </Table.TR>
  </Table.Head>
  <Table.Body>
  { 
    movieData && movieData.map(post => (
      <Table.TR key={post._id}>
      <Table.TH >{post.title}</Table.TH>
      <Table.TH>{post.year}</Table.TH>
      <Table.TH>{post.rating}</Table.TH>
      <Table.TH>{post.description}</Table.TH>
      <Table.TH > <StyledButton buttonLabel="✓" backgroundColor="#01bf41"  backgroundColorOnHover="green"
                        onClick={()=>{
                          
                          // dispatch(fetchOneMovie({id:post._id}))  
                          dispatch(toggleEdit({id:post._id}))
                                    
                        }
                  } >EDIT</StyledButton></Table.TH>   
      <Table.TH> <StyledButton buttonLabel="X"  backgroundColor="#e50d0d" 
              onClick={() =>{ dispatch(deleteMovie({id:post._id}))}}>{""}
                </StyledButton> 
                </Table.TH>
                             
    </Table.TR>          
          ))}
  </Table.Body>
</Table>

: 
<>
<UpdateMovies movieDataOne={movieDataOne} error={error} />
</>
}       
    </div>
  )
}
export default EditMovie