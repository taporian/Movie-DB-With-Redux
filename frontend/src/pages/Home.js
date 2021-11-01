import React, { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovie,filterMovie} from '../redux/action-creators'
import { Table } from "../components/Table";
import { InputSearch} from '../components/styled/Input.style'

import { ButtonSearch } from "../components/styled/Button.style";


const Home = () => {

  const dispatch = useDispatch();
 
  const  { movieData, loading, error } = useSelector((state) =>  state.fetchMoviesReducer);

  const  { movieFilterData } = useSelector((state) =>  state.filterMoviesReducer);
  
  const [filerState,setFilerState] = useState();

 
  const handleOnChange = event => {
    const name = event.target.value;
    setFilerState(name);
    dispatch(filterMovie({search:name}))
  };

  useEffect(() => {
    
   dispatch( fetchMovie());
   
}, [dispatch]);



  return ( 
    
    <div>
      
       <InputSearch placeholder="🔎"
              type="text"   
              onChange={handleOnChange}
              
            />
           
            <ButtonSearch
          
                type="button"
                onClick={()=>{
                  
                  dispatch(filterMovie({search:filerState}))
                }}
              
              > Search </ButtonSearch>
      <div>
        {loading && <div>LOADING...</div>}
        {error && <div>{error}</div>}
      </div>
   <Table>
  <Table.Head>
    <Table.TR>
      <Table.TH>Title</Table.TH>
      <Table.TH>Year</Table.TH>
      <Table.TH>Rating</Table.TH>
      <Table.TH>Description</Table.TH>
    </Table.TR>
  </Table.Head>
  { !movieFilterData  ?
  <Table.Body>
{movieData && movieData.map(post => (
            <Table.TR key={post._id}>
      <Table.TH >{post.title}</Table.TH>
      <Table.TH>{post.year}</Table.TH>
      <Table.TH>{post.rating}</Table.TH>
      <Table.TH>{post.description}</Table.TH>
    </Table.TR>          
          ))} 
  </Table.Body> 
  :  
  // <div> {movieFilterData.title} </div>
  
  <Table.Body>
{movieFilterData && movieFilterData  && movieFilterData.map(filterpost => (
            <Table.TR key={filterpost._id}>
      <Table.TH >{filterpost.title}</Table.TH>
      <Table.TH>{filterpost.year}</Table.TH>
      <Table.TH>{filterpost.rating}</Table.TH>
      <Table.TH>{filterpost.description}</Table.TH>
    </Table.TR>          
          ))} 
  </Table.Body>
}
</Table>
    </div>
  )
}
export default Home