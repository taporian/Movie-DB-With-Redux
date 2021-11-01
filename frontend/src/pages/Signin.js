import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container,Row,Col25,InputFormTxt,LabelForm,InputFormSub,ErrorPForm } from "../components/styled/Login.style";
import { signIn } from "../redux/action-creators";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.authenticationReducer);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
   
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (d) =>{
  
     dispatch(signIn(d, history));
  }

  return (

      
        <Container>
  <form onSubmit={handleSubmit(onSubmit)}>
  <Row>
      <Col25>
        <LabelForm >Email</LabelForm>
      </Col25>
      <Col25>
        <InputFormTxt {...register("email")}/>
        <ErrorPForm>{errors.email?.message}</ErrorPForm>      
      </Col25>
      
    </Row>
    <Row>
      <Col25>
        <LabelForm >Password</LabelForm>
      </Col25>
      <Col25>
        <InputFormTxt type="password" {...register("password")} />
        <ErrorPForm>{errors.password?.message}</ErrorPForm>
        <ErrorPForm>{error && error.password}</ErrorPForm>
        <ErrorPForm>{error && error.email}</ErrorPForm>
      </Col25>
    </Row>
    <Row>
    </Row>
    <Row>
     
    </Row>
    <Row>
      <InputFormSub  type='submit' value='SIGN IN'/>
    </Row>
  </form>
  <Link to="/signup">Don't have an account?</Link>
</Container>
        
  
  
  );
};

export default Signin;