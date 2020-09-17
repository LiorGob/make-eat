import { Home } from './pages/Home.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { RecipeApp } from './pages/RecipeApp.jsx'
import { RecipeDetails } from './pages/RecipeDetails.jsx'
import { RecipeEdit } from './pages/RecipeEdit.jsx'
import { ShoppingCart } from './pages/ShoppingCart.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserList } from './pages/UserList.jsx'

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
        path: '/user',
        component: UserList
    },
    {
        path: '/user/:id',
        component: UserDetails
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
    {
        path: '/',
        component: Home
    }
]