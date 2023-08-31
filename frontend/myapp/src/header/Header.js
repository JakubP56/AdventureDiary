import React from 'react'
import {AppBar, Tab, Tabs, Toolbar} from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const linksArray=["home","diaries","auth"];
const loggedInLinks=["home", "diaries","add", "profile"];
const Header = () => {

  const isLoggedIn= useSelector(state => state.isLoggedIn);

  return (
    <AppBar sx = {{bgcolor: "grey", position:"sticky" }}>
        <Toolbar>
            <TravelExploreIcon sx = {{color: "orange" , fontSize :"40px"}}></TravelExploreIcon>
            <Tabs sx = {{ml:"auto"}}>
                {isLoggedIn ? loggedInLinks.map((link)=> ( 
                <Tab 
                LinkComponent={Link}
                to={`/${link==="home" ? "":link}`}
                sx = {{color: "orange"}} label={link}>
                </Tab>))
                
                :
       
                linksArray.map((link)=> ( 
                <Tab 
                LinkComponent={Link}
                to={`/${link==="home" ? "":link}`}
                sx = {{color: "orange"}} label={link}>
                </Tab>))}
            </Tabs>
        </Toolbar>
    </AppBar>
  )
}

export default Header;