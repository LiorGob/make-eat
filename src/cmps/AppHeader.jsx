import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUser, logout } from '../store/actions/userActions';

function _AppHeader(props) {
    return (
        <header className="main-header flex align-center space-between">
            <div className="logo"><a href="/">Make Eat</a></div>
            <ul className="main-nav flex">
                {!props.loggedInUser && 
                    <li className="link flex align-center"><Link to='/login'>Login</Link></li>
                }
                {props.loggedInUser &&
                    <React.Fragment>
                    <li className="link flex align-center"><Link to={`/user/${props.loggedInUser._id}/about`}>Profile</Link></li>
                    <li className="link flex align-center"><Link to='' onClick={props.logout}>Log out</Link></li>
                    </React.Fragment>
                }
            </ul>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    getUser,
    logout
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)