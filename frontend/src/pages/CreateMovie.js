import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createMovie } from "../redux/action-creators";
import { Container,Row,Col25,InputFormTxt,LabelForm,InputFormSub,ErrorPForm, TextareaForm } from "../components/styled/Form.style";
import Home from "./Home";


const CreateMovie = () => {

  const dispatch = useDispatch();
  
  const { createMovieData  } = useSelector((state) => state.createMoviesReducer);
  
  const schema = yup.object().shape({
    title: yup.string().required(),
    year: yup.number().min(1000,'Minimum Year should be 1000').max(9999,'Maximum Year should be 9999').typeError("Must be a number"),
    rating: yup.number().min(1,'Minimum Rating should be 1').max(10,'Maximum Rating should be 10').typeError("Must be a number"),
    description: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (d) =>{

     dispatch(createMovie(d));
     reset();
   
  }
  




  return (
    <div>
<Home/>
<br/>
<Container>
  <form onSubmit={handleSubmit(onSubmit)}>
  <Row>
      <Col25>
        <LabelForm >Title</LabelForm>
      </Col25>
      <Col25>
        <InputFormTxt {...register("title")}/>
        <ErrorPForm>{errors.title?.message}</ErrorPForm>
       
        {createMovieData && createMovieData.movieMessageExists &&
           <ErrorPForm> 
             {createMovieData.movieMessageExists.title}
           </ErrorPForm>
             
            } 
      </Col25>
    </Row>
    <Row>
      <Col25>
        <LabelForm >Year</LabelForm>
      </Col25>
      <Col25>
        <InputFormTxt {...register("year")} />
        <ErrorPForm>{errors.year?.message}</ErrorPForm>
      </Col25>
    </Row>
    <Row>
      <Col25>
        <LabelForm >Rating</LabelForm>
      </Col25>
      <Col25>
        <InputFormTxt {...register("rating")}/>
        <ErrorPForm>{errors.rating?.message}</ErrorPForm>
      </Col25>
    </Row>
    <Row>
      <Col25>
        <LabelForm >Description</LabelForm>
      </Col25>
      <Col25>
        <TextareaForm {...register("description")} ></TextareaForm>
        <ErrorPForm>{errors.description?.message}</ErrorPForm>
        {createMovieData && createMovieData.movieMessageExists &&
           <ErrorPForm> 
             {createMovieData.movieMessageExists.description}
           </ErrorPForm>    
            } 
      </Col25>
    </Row>
    <Row>
      <InputFormSub  type='submit' value='Create Movie'/>
    </Row>
  </form>
</Container>

      
      
      
    </div>
  );
};

export default CreateMovie;

