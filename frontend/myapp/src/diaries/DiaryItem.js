import React, { useState } from 'react'
import { Alert, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Snackbar, Typography } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/material'
import { Link } from 'react-router-dom';
import { postDelete } from '../api-helpers/helpers';

const DiaryItem = ({title,description,image,location,date,id, user}) => {

const [open, setopen] = useState(false);

  const isLoggedInUser = () => {
    if(localStorage.getItem("userId") === user) {
      return true
    }
    return false
  }

  const handleDelete = () => {
    postDelete(id)
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  };
  return (
    <Card sx={{width:"50%",height: "60%", margin:1, padding:1, display:"flex", flexDirection:"column", boxShadow: "5px 5px 10px grey" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img
        height="50%"
        src={image}
        alt={title}
      />
      <CardContent>
      <Typography paddingBottom={1} variant="h5" color="black">
          {title}
        </Typography>
        <hr></hr>
        <Box paddingTop={1} >
        <Typography fontWeight={"bold"} variant='div'> </Typography>
        <Typography paddingTop={1} variant="body2" color="text.secondary">
          {description}
        </Typography>
        </Box>
        
      </CardContent>
      {isLoggedInUser() && (
      <CardActions sx={{marginLeft:"auto"}}>
        <Button LinkComponent={Link} to={`/post/${id}`}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </CardActions>
      )}

    <Snackbar open={open} autoHideDuration={6000} onClose={() =>setopen(false)}>
    <Alert onClose={() =>setopen(false)} severity="success" sx={{ width: '100%' }}>
     Deleted Succesfully!
    </Alert>
    </Snackbar>

    </Card>
  )
}

export default DiaryItem