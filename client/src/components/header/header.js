import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideDrawer from './Sidenav/sideNavigation';
import { useSelector } from 'react-redux';
import Logo from './crossCircle-mod_50.png'


const Header = (props) =>{

    let [mainNav, setMainNav] = useState(false);
    const users = useSelector(state => state.user)
    
    const onShowNav = () =>{
        setMainNav(true)
    }

    const onHideNav = () =>{
        setMainNav(false)
    }

    return(
        <header className="shadow-sm p-1 mb-1 bg-white rounded">
            <div className='d-flex'>
                    <div className='mr-auto p-4'>
                    <Link to='/dashboard'>
                        <>
                        {/* <img src={Logo} /> */}
                            <h1>
                                PatientScore.io
                            </h1>
                        </>
                    </Link>
                    </div>
                    {users.auth ?
                    <div>
                        <div className='p-4 mt-3'>
                            <SideDrawer/>
                        </div>
                    </div>

                    :
                    <>
                        <div className='p-4 mt-3'>
                            <Link to='/login' >
                                Login
                            </Link>
                        </div>
                        <div className='p-4 mt-3'>
                            <Link to='/signup' >
                                Sign Up
                            </Link>
                        </div>
                    </>
                    }
            </div>

        </header>
    )
}

export default Header;