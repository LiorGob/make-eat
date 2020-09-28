//import { Home } from './pages/Home.jsx'
import { RecipeApp } from './pages/RecipeApp.jsx'
import { RecipeDetails } from './pages/RecipeDetails.jsx'
import { RecipeEdit } from './pages/RecipeEdit.jsx'
import { ReviewList } from './cmps/review/ReviewList.jsx'
import { ShoppingCart } from './pages/ShoppingCart.jsx'
import { UserHome } from './pages/user/UserHome.jsx'
import { UserList } from './pages/user/UserList.jsx'
import { OrderList } from './pages/OrderList.jsx'

export default [
    {
        path: '/shopping-cart',
        component: ShoppingCart
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
        path: '/recipe/:id/review',
        component: ReviewList
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
        path: '/order/',
        component: OrderList
    }
]