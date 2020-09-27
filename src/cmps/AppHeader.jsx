import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUser, logout } from '../store/actions/userActions';
import { SearchPopover } from './search/SearchPopover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecondaryButton from './buttons/SecondaryButton';
import SearchIcon from '@material-ui/icons/Search';
import UserImage from './user/UserImage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function _AppHeader(props) {
    const [openSearch, setOpenSearch] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const logoRef = React.createRef();
    const handleClickOpen = (event) => {
        setOpenSearch(true);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSearch = (value) => {
        setOpenSearch(false);
        const mouseoverEvent = new Event('mousedown');
        logoRef.current.dispatchEvent(mouseoverEvent);
    };
    return (
        <header className="main-header main-container flex align-center space-between">
            <div className="logo" ref={logoRef}><a href="/"><img className="logo-img" src={require('../assets/images/logo/makeeatlogo5.png')} alt="logo" /></a></div>
            <div className="search-btn-container"><SecondaryButton onClick={handleClickOpen} text="Find a recipe" endIcon={<SearchIcon />} /></div>
            <div style={{ position: 'relative' }}><SearchPopover open={openSearch} onClose={handleCloseSearch} anchorEl={anchorEl} /></div>
            <ul className="main-nav flex row pipe">
                {!props.loggedInUser &&
                    <React.Fragment>
                        <li className="link flex align-center"><Link to='/user/signup'><AccountCircleIcon/>Join now</Link></li>
                        <ShoppingCartIcon className="shopping-cart self-center" color="secondary" style={{ cursor: "pointer", width: "40px" }} />
                        <div>{props.orderList?.length}</div>
                        <li className="link flex align-center"><Link to='/user/signup'><img className="join-now-img" src={require('../assets/images/profile.png')} alt="profile-img" />Join now</Link></li>
                        <li className="link flex align-center"><Link to='/user/login'>Login</Link></li>
                    </React.Fragment>
                }
                {props.loggedInUser &&
                    <React.Fragment>
                        <li className="link flex align-center">
                            <ShoppingCartIcon className="shopping-cart self-center" color="secondary" style={{ width: "40px", paddingRight: "10px", cursor: "pointer" }} />
                            <UserImage user={props.loggedInUser} />
                            <Link to={`/user/myprofile/about`}>Profile</Link></li>
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
        searchedRecipes: state.searchReducer.searchedRecipes,
        orderList: state.orderReducer.orderList,
    }
}

const mapDispatchToProps = {
    getUser,
    logout
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)