import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addPost, getPostDetails, postUpdate } from '../api-helpers/helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const DiaryUpdate = () => {

    const [post, setPost] = useState();
   
    const [inputs, setinputs] = useState({title: "", description:"", location:"",imageUrl:"" ,date:""});

    const id = useParams().id;
    console.log(id);

   useEffect(() => {
    getPostDetails(id)
    .then((data)=> {
          
        setPost(data.post);

        setinputs({
            title: data.post.title,
            description: data.post.description,
            imageUrl : data.post.image,
            location: data.post.location,
        });
        })
    .catch(err=>console.log(err))
   }, [id]);

   

   const handleChange =(e) => {
       setinputs((prevState) => ({
           ...prevState,
           [e.target.name] : e.target.value,
       }))
   };

   const handleSubmit = (e) => {
       e.preventDefault();
       console.log(inputs);
       postUpdate(inputs,id)
       .then((data) => console.log(data))  
       .catch(err=>console.log(err))
       
   }
 return (
  <Box display="flex" flexDirection={"column"} width={"100%"} height={"100%"}>
       <Box display={"flex"} margin={"auto"} padding={2}>
       <Typography variant="h4" fontFamily={"'Lobster', cursive"}>Edit Your Diary Entry</Typography>
       </Box>
       <form onSubmit={handleSubmit}>
           <Box width={"50%"} padding={3} display={"flex"} margin={"auto"} flexDirection={"column"}>
               <FormLabel>Title</FormLabel>
               <TextField onChange={handleChange} name='title' value={inputs.title} margin='normal'/>
               <FormLabel>Description</FormLabel>
               <TextField onChange={handleChange} name='description' value={inputs.description} margin='normal'/>
               <FormLabel>Image Url</FormLabel>
               <TextField onChange={handleChange} name='imageUrl' value={inputs.imageUrl} margin='normal'/>
               <FormLabel>Location</FormLabel>
               <TextField onChange={handleChange} name='location' value={inputs.location}  margin='normal'/>
               <Button type='submit' variant='contained'>Edit Diary</Button>
           </Box>

       </form>
  </Box>
 )
}

export default DiaryUpdate