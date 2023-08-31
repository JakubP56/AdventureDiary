import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addPost } from '../api-helpers/helpers';

const Add = () => {
    const [inputs, setinputs] = useState({title: "", description:"", location:"",imageUrl:"" ,date:""});

    const handleChange =(e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        addPost(inputs).then((res) => console.log(res)).catch(err =>console.log(err))
    }
  return (
   <Box display="flex" flexDirection={"column"} width={"100%"} height={"100%"}>
        <Box display={"flex"} margin={"auto"} padding={2}>
        <Typography variant="h4" fontFamily={"'Lobster', cursive"}>Add An Entry To Your Diary</Typography>
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
                <FormLabel>Date</FormLabel>
                <TextField type='date' onChange={handleChange} name='date' value={inputs.date}  margin='normal'/>
                <Button type='submit' variant='contained'>Post To Diary</Button>
            </Box>

        </form>
   </Box>
  )
}

export default Add