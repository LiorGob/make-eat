import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUser, logout } from '../store/actions/userActions';
import Search from '../cmps/search/Search';

function _AppHeader(props) {
    return (
        <header className="main-header flex align-center space-between">
            <Search/>
                     <div className="logo"><a href="/"><img className="logo-image" src={require('../assets/images/logo/makeeatlogo3.png')} alt="logo"/></a></div>
            {/* <div className="logo"><a href="/"><img className="logo-image" src={require('../assets/images/logo/flying cargo logo.png')} alt="logo"/></a></div> */}
            
            <ul className="main-nav flex row pipe">
                {!props.loggedInUser && 
                    <React.Fragment>
                    <li className="link flex align-center"><Link to='/user/signup'><img className="join-now-img" src={require('../assets/images/profile.png')} alt="profile-img" />Join now</Link></li>
                    <li className="link flex align-center"><Link to='/user/login'>Login</Link></li>
                    </React.Fragment>
                }
                {props.loggedInUser &&
                    <React.Fragment>
                    <li className="link flex align-center"><Link to={`/user/myprofile/about`}>Profile</Link></li>
                    <li className="link flex align-center"><Link to='' onClick={props.logout}>Log out</Link></li>
                    </React.Fragment>
                }
            </ul>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        recipes: state.recipeReducer.recipes,
        filterBy: state.produceReducer.filterBy,
        searchedRecipes: state.searchReducer.searchedRecipes
    }
}

const mapDispatchToProps = {
    getUser,
    logout
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)