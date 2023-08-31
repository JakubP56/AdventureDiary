import React, { useState } from 'react'
 import { Box, Button, FormLabel, TextField, Typography } from "@mui/material"
import { sendAuthRequest } from '../api-helpers/helpers';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Auth = () => {
const dispatch = useDispatch();
const [isSignedUp, setSignUp] = useState(false);
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs);

  if(isSignedUp){
    sendAuthRequest(true,inputs).then((data) => localStorage.setItem("userId", data.user._id))
    .then(() => {dispatch(authActions.login()) })
    .catch((err) => console.log(err));
  }
  else{
    sendAuthRequest(false,inputs).then((data)=> localStorage.setItem("userId", data.id))
    .then(() => {dispatch(authActions.login()) })
    .catch((err)=>console.log(err));
  }
};

const [inputs, setInputs] = useState({name: "", email: "", password: ""});
const handleChange = (e) => {
  setInputs((prevState) => ({...prevState,
  [e.target.name] : e.target.value
  }));
};
  return (
    <Box width="40%" 
    borderRadius={10} 
    boxShadow={"5px 5px 10px black"}
    margin="auto"
    marginTop={10}
    >
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} 
        flexDirection={"column"} 
        width={"60%"} 
        padding={5} 
        margin="auto"
        >
          <Typography variant='h4' textAlign={"center"}>{isSignedUp ? "Sign Up" : "Log In"}</Typography>
          {isSignedUp &&( <><FormLabel>Name</FormLabel>
          <TextField onChange={handleChange} value= {inputs.name} name = "name" required margin='normal'/></>)}
          <FormLabel>E-mail</FormLabel>
          <TextField onChange={handleChange} value= {inputs.email} name = "email" required margin='normal'/>
          <FormLabel>Password</FormLabel>
          <TextField onChange={handleChange} value= {inputs.password} name = "password" required margin='normal'/>
          <Button sx={{mt:1}}variant='contained'>{isSignedUp? "Sign Up" : "Log In"}</Button>
          <Button onClick={()=>setSignUp(!isSignedUp)} sx={{mt:1}} type="submit" variant='outlined'>Go to {isSignedUp ? "Log In": "Sign Up"}</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Auth