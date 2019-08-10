/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as Products} from './Products'
export {default as SingleProduct} from './SingleProduct'
export {default as Homepage} from './Homepage'
export {default as Checkout} from './Checkout'
export {default as Cart} from './Cart'
export {default as EditUser} from './EditUser'
export {default as UserOrderDetails} from './user-orders-details'
export {Login, Signup} from './auth-form'
export {AddProduct, EditProduct} from './product-form'
export {default as CategoryForm} from './category-form'
export {default as AddAddress} from './AddAddress'
export {default as MakeReview} from './MakeReview'
export {default as OurTeam} from './OurTeam'
