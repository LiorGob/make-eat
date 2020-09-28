import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../store/actions/userActions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dialog } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class _Login extends Component {
    handleClose = () => {
        this.props.onClose();
    };
    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <section className="uiForm login">
                    <h1>Login with email.</h1>
                    <h4 className="signin-subhead">Existing makeEat users.</h4>
                    <Formik initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                this.props.login(values);
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div><Field type="email" name="email" placeholder="Email" />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div>
                                    <Field type="password" name="password" placeholder="Password" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <input type="submit" disabled={isSubmitting} value="Login" />
                            </Form>
                        )}
                    </Formik>
                    <p><Link to="/user/signup" className="join-for-free"><span>New to makeEat?</span> Join for free!</Link></p>
                </section>
            </Dialog>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    login
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
