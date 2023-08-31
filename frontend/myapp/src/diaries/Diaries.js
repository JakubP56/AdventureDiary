import React, { useEffect, useState } from 'react'
import DiaryItem from './DiaryItem'
import { Box } from '@mui/material'
import { getAllPosts } from '../api-helpers/helpers';

const Diaries = () => {
  const [posts,setPosts] = useState();
  useEffect(() => {
    getAllPosts()
    .then((data) => setPosts(data?.posts))
    .catch(err=> console.log(err));
  }, []);

  return (
    <Box display={"flex"} 
    flexDirection={"column"} 
    padding={3} 
    justifyContent={"center"} 
    alignItems={"center"}>

    { posts && posts.map((item,index)=><DiaryItem 
   
    description={item.description} 
    image={item.image}
    id={item._id}
    location={item.location}
    title={item.title}
    key={index}
    user={item.user}
    />)}
    <DiaryItem/>
    </Box>
  )
}

export default Diaries