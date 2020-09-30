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
import { Badge } from '@material-ui/core';
// import NavBarHumburger from '../cmps/navBar/NavBarHumburger'
import { Login } from './user/Login';
import { Signup } from './user/Signup';
function ShoppingCartBadge({ orderListSize }) {
    function ShoppingCart(){
        return (
        <ShoppingCartIcon className="shopping-cart self-center" style={{ cursor: "pointer", width: "40px", color:"#000000f2" }} />
        )
    }
    return (
        <React.Fragment>
            {
                orderListSize ? 
                <Badge badgeContent={orderListSize} anchorOrigin={{ vertical: 'top', horizontal: 'right'}}  color="secondary">
                    <ShoppingCart/>
                </Badge>
                :
                <ShoppingCart/>
            }
        </React.Fragment>)
}
function LoggedUserLinks({ user, logout }) {
    return (
        <React.Fragment>
            <li className="link flex align-center">
                <UserImage user={user} />
                <Link to={`/user/myprofile/about`}>Profile</Link></li>
            <li className="link flex align-center"><Link to='' onClick={logout}>Log out</Link></li>
        </React.Fragment>
    )
}
function GuestUserLinks() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const handleOpenSignup = (event) => {
        setOpenSignup(true);
    };
    const handleOpenLogin = (event) => {
        setOpenLogin(true);
    };
    return (
        <React.Fragment>
            <li className="link flex align-center"><span onClick={handleOpenSignup}><AccountCircleIcon />Join now</span></li>
            <li className="link flex align-center"><span onClick={handleOpenLogin}>Log in</span></li>
            <Signup open={openSignup} onClose={() => setOpenSignup(false)} />
            <Login open={openLogin} onClose={() => setOpenLogin(false)} />
        </React.Fragment>
    )
}
function _AppHeader(props) {
    // const[openMenu,setOpenMenu]=useState(false)
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
    // const toggleOpenMenu=(event)=>{
    //     setOpenMenu(true) 
    // }
    // const toggleCloseMenu=(event)=>{
    //     setOpenMenu(false) 
    // }
    const isGuestMode = () => {
        return !props.loggedInUser || props.loggedInUser.isGuest;
    }
    return (
        <header className="main-header main-container flex align-center space-between">
            <div className="logo" ref={logoRef}><a href="/"><img className="logo-img" src={require('../assets/images/logo/makeeatlogo5.png')} alt="logo" /></a></div>
            <div className="search-btn-container"><SecondaryButton variant="outlined" onClick={handleClickOpen} text="Find a recipe" endIcon={<SearchIcon />} /></div>
            <div style={{ position: 'relative' }}><SearchPopover open={openSearch} onClose={handleCloseSearch} anchorEl={anchorEl} /></div>
            <div className="flex row">
            <ShoppingCartBadge orderListSize={props.orderListSize} />
            <ul className="main-nav flex row pipe">
                {isGuestMode() ?
                    <GuestUserLinks />
                    :
                    <LoggedUserLinks user={props.loggedInUser} logout={props.logout} />
                }
            </ul>
            </div>
        </header>
    )
}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser,
        recipes: state.recipeReducer.recipes,
        filterBy: state.produceReducer.filterBy,
        searchedRecipes: state.searchReducer.searchedRecipes,
        orderListSize: state.orderReducer.orderListSize,
    }
}
const mapDispatchToProps = {
    getUser,
    logout
}
export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)


