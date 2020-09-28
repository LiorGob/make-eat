import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import { getUser, logout } from '../store/actions/userActions';
// import { SearchPopover } from './search/SearchPopover';

class _NavBarHumburger extends Component {

    state={
        isMenueHidden: true
    }

    toggleMenu=()=>{
        const isMenuHidden = !this.state.isMenuHidden;
        this.setState({ isMenuHidden });
    }

    render() {
        const { isMenuHidden } = this.state;
        return (
            <header>
                <section className="header-container">
                    <div className="btn-nav-menu" onClick={this.toggleMenu}>☰</div>
                    <nav className="nav-container" style={{ display: (isMenuHidden) ? 'none' : 'block' }}>
                        {!isMenuHidden && <React.Fragment>
                            {/* <NavLink exact activeClassName='active-nav' onClick={this.toggleMenu} to='/user/login' >
                                <div className="nav-link">
                                    <h3>Login</h3>
                                </div>
                            </NavLink>
                            <NavLink exact onClick={this.toggleMenu} to='/user/signup'>
                                <div className="nav-link">
                                    <h3>Join now</h3>
                                </div>
                            </NavLink> */}
                            
                        </React.Fragment>}
                    </nav>
                </section>
            </header>
        )
    }
}


const mapStateToProps = state => {
    return {
        // loggedInUser: state.userReducer.loggedInUser,
        // recipes: state.recipeReducer.recipes,
        // filterBy: state.produceReducer.filterBy,
        // searchedRecipes: state.searchReducer.searchedRecipes,
      
    }
}

const mapDispatchToProps = {
    // getUser,
    // logout
}

export const NavBarHumburger = connect(mapStateToProps, mapDispatchToProps)(_NavBarHumburger)

