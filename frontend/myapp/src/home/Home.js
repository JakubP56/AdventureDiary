import React from 'react'
import {Box} from "@mui/system"
import {Button, Typography} from "@mui/material"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box position={"relative"} width="100%" height="90vh">
      <img src="/travel.jpeg" alt="IMAGE" width={"100%"} height={"80%"} />
      <Typography fontFamily={"'Lobster', cursive"} variant="h3" textAlign={'center'} width="100%" sx={{position:"absolute", top:"0px" }}>
         Save all your favorite Travel Moments</Typography>
      <Box width={"100%"} height={"20%"} display={"flex"} flexDirection={"column"}>
        <Typography fontFamily={"'Open Sans', sans-serif"}textAlign={"center"} variant='h4' padding={4}>
          Share Your Diary With Us!
        </Typography>
        <Box margin="auto">
          <Button variant='outlined' sx={{mr:2 }}>
            Share Your Adventure
          </Button>
          <Button LinkComponent={Link} to="/diaries" variant='contained' sx={{ml:2 }}>
            View Diary Entries
          </Button>

        </Box>
      </Box>
    </Box>
  )
}

export default Home