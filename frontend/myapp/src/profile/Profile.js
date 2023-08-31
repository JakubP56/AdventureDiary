import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../api-helpers/helpers'
import {Box, Button, Typography} from "@mui/material"
import DiaryItem from '../diaries/DiaryItem';
import {useDispatch} from 'react-redux'
import {authActions} from '../store'
import {useNavigate} from 'react-router-dom'



const Profile = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const [user, setuser] = useState();

useEffect(() =>{
  getUserDetails().
  then((data) => setuser(data.user)).
  catch(err=> console.log(err))
},[]);

const handleClick = () => {
  dispatch(authActions.logout());
  localStorage.removeItem("userId");
  navigate("/");
}



  return (
    <Box display="flex" flexDirection={'column'}>
      {user && <> <Typography textAlign={'center'} variant='h3' fontFamily={"'Lobster', cursive"} padding={2}> User Profile</Typography>

      <Typography  padding={1} textAlign={"left"}>
          Name: {user.name}
      </Typography>
      <Typography  padding={1} textAlign={"left"}>
          Email: {user.email}
      </Typography>
      <Button onClick={handleClick} variant="contained" sx={{mr:"auto"}}>Log Out</Button>
      <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        {user.posts.map((post,index)=><DiaryItem key={index} title={post.title} description={post.description} id={post.id} image={post.image} location={post.location} user={user._id}></DiaryItem>)}
      </Box> </>}
    </Box>
  )
}

export default Profile