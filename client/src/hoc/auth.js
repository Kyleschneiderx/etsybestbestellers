import React, {Component} from 'react';
import {auth} from '../store/actions/user_actions';
import {connect} from 'react-redux';
import { SyncOutlined } from "@ant-design/icons";


const styles = {
    root: {
      flexGrow: 1
    },
    colorPrimary: {
      background: 'green'
    }
  };

export default function(ComposedClass, reload, roleCheck=false) {
    class AuthenticationCheck extends Component{

        state={
            loading:true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response =>{
                let user = this.props.user.auth;

                this.setState({loading:false})
                if(!user){
                    if(reload){
                        this.props.history.push('/login');
                    }
                } else {
                    if(reload === false){
                        this.props.history.push('/dashboard')
                    }
                    
                }

            })
        }

        render(){
            if(this.state.loading){
                return(
                    <div
                    className="d-flex justify-content-center fw-bold"
                    style={{ height: "90vh" }}
                  >
                    <div className="d-flex align-items-center">
                      <SyncOutlined spin style={{ fontSize: "50px" }} />
                    </div>
                  </div>
                )
                // <div className= "loader">Loading...</div>
                ///<LinearProgress style={{backgroundColor: "#3fbcc5"}}/>
            }else{
                return <ComposedClass {...this.props} user={this.props.user}/>
            }

        }
    
    }

    function mapStateToProps(state){
        return{
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}