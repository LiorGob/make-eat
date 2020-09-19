import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup } from '../../store/actions/userActions'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});
class _Signup extends Component {


    render() {
        return (
            <section className="uiForm login">
                <h1>Sign up with email.</h1>
                <Link to="/user/login" className="btn-right" >Already a member? Sign in!</Link>
                <Formik initialValues={{ fullName: '', email: '', password: '' }}
                    validationSchema={SignupSchema}                    
                    onSubmit={values => {
                        this.props.signup(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field type="text" name="fullName" placeholder="Display name" />
                            {errors.fullName && touched.fullName ? (<div>{errors.fullName}</div>) : null}                            
                            <Field type="email" name="email" placeholder="Email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <Field type="password" name="password" placeholder="Password" />
                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                            <input type="submit" value="Sign up" />
                        </Form>
                    )}
                </Formik>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    signup
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)