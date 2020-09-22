import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUser, logout } from '../store/actions/userActions';
import { IngredientSearch } from './IngredientSearch';
// import { RecipeList } from './RecipeList';
import { useRouteMatch } from 'react-router-dom';
import {setFilteredRecipes} from '../store/actions/filteredRecipeActions'


// import logo from '../assets/images/logo/makeeatlogo.png'


function _AppHeader(props) {
    const [filteredRecipeList,setFilteredRecipeList]= useState([])
     const params=useRouteMatch()
     let path =true
const {id} = params
//    console.log(params)

    return (
        <header className="main-header flex align-center space-between">
            <div style={{display:path ?'none':'none' }}className="header-search">
              <IngredientSearch filterField={"name"} isIngredients getFilterList={(filterRecipeList) => setFilteredRecipeList( filterRecipeList)} placeholder="Search produce" />
                    <IngredientSearch filterField={"name"} getFilterList={(filterRecipeList) => setFilteredRecipeList( filterRecipeList)} placeholder="Search recipe" />
                  
                    </div>
            <div className="logo"><a href="/"><img className="logo-image" src={require('../assets/images/logo/makeeatlogo3.png')} alt="logo"/></a></div>
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
        filteredRecipes: state.filteredRecipeReducer.filteredRecipes
    }
}

const mapDispatchToProps = {
    getUser,
    logout,
    setFilteredRecipes
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)