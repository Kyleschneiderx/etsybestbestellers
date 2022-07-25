import React from 'react';
import Header from '../components/header/header'

const MainLayout = (props) => (
   
    <> 
        <>
            <Header/>
            {props.children}
        </>
    </>
)

export default MainLayout;