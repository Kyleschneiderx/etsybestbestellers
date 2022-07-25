import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {registerUser} from '../store/actions/user_actions'
import {Link} from 'react-router-dom'

const LoginSchema = Yup.object().shape({
    companyName:Yup.string().required(),
    password:Yup.string()
    .min(6," Too short")
    .required("Required !!"),
    email:Yup.string()
    .email('Invalid Email :(')
    .required("Required !!")
})

 


class Signup extends Component {

    state ={
        success:false,
        validation: false,
        errorMessage:''

    }


    static getDerivedStateFromProps(props, state){

        const auth = props.user.auth;

        if(auth){
            return{
                success: auth ? true : false
            }
        }
        return null;
    }

    componentDidUpdate(){
        if(this.state.success){
            this.props.history.push('/home');
        }
    }


    render(){
        console.log(this.props)
        return(   
        <div className="border rounded container h-200 d-flex justify-content-center form_container">
            <div className='row'>
                <div className='col'>
                    <h1 className="pt-5 fw-bold">Welcome</h1>
                    <Formik
                        initialValues={{companyName:'' ,email:'', password: ''}}
                        validationSchema={LoginSchema}
                        onSubmit={values =>{
                            console.log(values)
                            this.props.dispatch(registerUser(values)).then(response =>{
                                if(!this.props.user.auth){
                                    this.setState({
                                        validation:true,

                                    })
                                }
                            })

                        }}  
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit

                        })=>(
                            <form onSubmit={handleSubmit}>

                                <div className="d-flex justify-content-center mt-3">
                                    <div className='twelve columns'>
                                        <input
                                        type="companyName"
                                        name="companyName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.companyName}
                                        placeholder="Company Name Here"
                                        className="u-full-width"
                                        />
                                        { errors.companyName && touched.companyName ? 
                                            <div className="error_label">{errors.companyName}</div>
                                        :null}
                                    </div>

                                </div>

                                <div className="d-flex justify-content-center mt-3">
                                    <div className='twelve columns'>
                                        <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="Enter your Email"
                                        className="u-full-width"
                                        />
                                        { errors.email && touched.email ? 
                                            <div className="error_label">{errors.email}</div>
                                        :null}
                                    </div>

                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <div className='twelve columns'>
                                        <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder="Enter your password"
                                        className="u-full-width"
                                        />
                                        { errors.password && touched.password ? 
                                            <div className="error_label">{errors.password}</div>
                                        :null}
                                    </div>

                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <Link to='/login'>Sign In Here!</Link>
                                </div>

                                <br/>
                                {
                                    this.state.validation ?
                                    <div className='error_label'>
                                        Error, Please try again
                                    </div>
                                :null
                                }

                            </form>
                        )}
                    </Formik>
                    </div>
                </div>
            </div>
        )
    }

}


function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Signup);