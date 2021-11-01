import React, { useEffect } from "react"
import { StyledButton}  from "../components/styled/Button.style";
import { Table } from "../components/Table";
import { Input } from "./styled/Input.style";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import {toggleEditTrue,updateMovie} from '../redux/action-creators';
import {ErrorPForm} from './styled/Form.style';


  const UpdateMovies = ({movieDataOne,error}) =>{

    
    
    const dispatch = useDispatch();
    const history = useHistory();
    const schema = yup.object().shape({
        id: yup.string(),
        title: yup.string().required(),
        year: yup.number().min(1000).max(9999).typeError("Must be a number"),
        rating: yup.number().min(1).max(10).typeError("Must be a number"),
        description: yup.string(),
      })
    
      const {
        register,
        handleSubmit,
        formState: { errors },
       
        reset,
      } = useForm({ resolver: yupResolver(schema),
        defaultValues:  movieDataOne
      });
    
      const onSubmit = async (d) =>{      
           if(await updateMovie(d,dispatch)){
            dispatch(toggleEditTrue());
         }   
      }
      useEffect(() => {
       
        reset(movieDataOne);
      }, [movieDataOne]);



return (
    <div>
   <Table>
    <Table.Head>
    <Table.TR>
 <Table.TH>Title</Table.TH>
 <Table.TH>Year</Table.TH>
 <Table.TH>Rating</Table.TH>
 <Table.TH>Description</Table.TH>
 <Table.TH>UPDATE</Table.TH>
 <Table.TH>Cancel</Table.TH>

</Table.TR>
</Table.Head>
</Table>
   {movieDataOne && movieDataOne._id && movieDataOne.title && 
       <form onSubmit={handleSubmit(onSubmit)}>       
         <Table>
  <Table.Body>
    <Table.TR key={movieDataOne._id}>
    <Input type="hidden" {...register("id")} 
    defaultValue={movieDataOne._id}
    />
       
  <Table.TH > <Input   {...register("title")} 
 
  />  {error && <ErrorPForm>{error}</ErrorPForm> }
  <ErrorPForm>{errors.title?.message}</ErrorPForm></Table.TH>

  <Table.TH > <Input   {...register("year")} 
 
  />
  <ErrorPForm>{errors.year?.message}</ErrorPForm></Table.TH>
 
  <Table.TH >  <Input  {...register("rating")} 
  
   />
  <ErrorPForm>{errors.rating?.message}</ErrorPForm></Table.TH>
 
  <Table.TH > <Input   {...register("description")} 
  
  />
  <ErrorPForm>{errors.description?.message}</ErrorPForm></Table.TH>
  
 <Table.TH > <StyledButton type='submit' buttonLabel="✓"  backgroundColor="#01bf41"  backgroundColorOnHover="green"   
         ></StyledButton></Table.TH>    
         <Table.TH> <StyledButton buttonLabel="X"  backgroundColor="#e50d0d" 
              onClick={() => history.go(0) }>{""}
                </StyledButton> 
                </Table.TH> 
            </Table.TR> 
            
            </Table.Body>           
              </Table>              
              </form>
}
</div>

)

}


export default UpdateMovies