
import React,{ useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CallIcon from '@material-ui/icons/Call';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import {logoutUser} from '../../../store/actions/user_actions'

const SideDrawer = ({history}) => {
    const [state,setState] = useState(false);
    const users = useSelector(state => state.user)
    const dispatch = useDispatch()

    return(
        <>  
            {users.auth ?
            <SettingsIcon
                className="drawer_btn"
                onClick={()=> setState(true)}
            />
            :
            null }
            <Drawer anchor={'right'} open={state} onClose={()=> setState(false)}>
                <Divider/>
                <List>
                    <ListItem button component={RouterLink} to="/Dashboard" onClick={()=>setState(false)}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                                
                    { !users.auth ?
                        <List>
                            <ListItem button component={RouterLink} to="/login" onClick={()=>setState(false)}>
                                <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                                <ListItemText primary="Login"/>
                            </ListItem>
                            <ListItem button component={RouterLink} to="/login" onClick={()=>setState(false)}>
                                    <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                                    <ListItemText primary="Sign Up"/>
                            </ListItem>
                        </List>
                    :   <>
                        <ListItem button component={RouterLink} to="/account" onClick={()=>setState(false)}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary="Account"/>
                        </ListItem>
                        <ListItem button onClick={()=> { 
                            dispatch(logoutUser())
                            setState(false)


                        }}>

                            <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                            <ListItemText primary="Sign out"/>
                        </ListItem>
                        </>

                    }
                    
                    
                </List>
                    {/* { users.auth && users.userData.role === 0 ?
                        <>
                        <Divider/>
                            <List>
                                <ListItem button component={RouterLink} to="/billers" onClick={()=>setState(false)}>
                                    <ListItemIcon><CallIcon/></ListItemIcon>
                                    <ListItemText primary="Call List"/>
                                </ListItem>
                                <ListItem button component={RouterLink} to="/collections" onClick={()=>setState(false)}>
                                    <ListItemIcon><AttachMoneyIcon/></ListItemIcon>
                                    <ListItemText primary="Collections List"/>
                                </ListItem>
                            </List>
                        </>
                    :null} */}

                        {/* { users.auth && users.userData.role === 1 ?
                        <>
                        <Divider/>
                            <List>
                                <ListItem button component={RouterLink} to="/home" onClick={()=>setState(false)}>
                                    <ListItemIcon><QueueIcon/></ListItemIcon>
                                    <ListItemText primary="Referral List"/>
                                </ListItem>
                                <ListItem button component={RouterLink} to="/waitlist" onClick={()=>setState(false)}>
                                    <ListItemIcon><PanToolIcon/></ListItemIcon>
                                    <ListItemText primary="WaitList"/>
                                </ListItem>
                            </List>
                        </>
                    :null} */}
            </Drawer>
        </>
    )
}

export default SideDrawer;