import { Home } from './pages/Home.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { RecipeApp } from './pages/RecipeApp.jsx'
import { RecipeDetails } from './pages/RecipeDetails.jsx'
import { RecipeEdit } from './pages/RecipeEdit.jsx'
import { ShoppingCart } from './pages/ShoppingCart.jsx'
import { UserHome } from './pages/UserHome.jsx'
import { UserList } from './pages/UserList.jsx'
import { ProduceList } from './cmps/produce/ProduceList.jsx'

export default [
    {
        path: '/shopping-cart',
        component: ShoppingCart
    },
    {
        path: '/signup',
        component: LoginSignup
    },
    {
        path: '/login',
        component: LoginSignup
    },
    {
        path: '/user/:id/:path',
        component: UserHome
    },
    {
        path: '/user',
        component: UserList
    },
    {
        path: '/recipe/edit/:id?',
        component: RecipeEdit
    },
    {
        path: '/recipe/:id',
        component: RecipeDetails
    },
    {
        path: '/recipe',
        component: RecipeApp
    },
    // {
    // //     path: '/produce',
    // //     component: ProduceList
    // // },
    {
        path: '/',
        component: Home
    }



]