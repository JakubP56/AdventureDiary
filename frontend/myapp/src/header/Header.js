import React from 'react'
import {AppBar, Tab, Tabs, Toolbar} from '@mui/material'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from 'react-router-dom';
const linksArray=["home","diaries","auth"];

const Header = () => {
  return (
    <AppBar sx = {{bgcolor: "transparent", position:"sticky" }}>
        <Toolbar>
            <TravelExploreIcon sx = {{color: "orange" , fontSize :"40px"}}></TravelExploreIcon>
            <Tabs sx = {{ml:"auto"}}>
                {linksArray.map((link)=> ( 
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