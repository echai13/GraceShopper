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
export {default as AdminPanel} from './AdminPanel'
export {default as AdminUser} from './AdminUser'
export {default as AdminUserRow} from './AdminUserRow'
export {default as AdminOrder} from './AdminOrder'
export {default as AdminProduct} from './AdminProduct'
export {default as EditUser} from './EditUser'
export {Login, Signup} from './auth-form'
export {default as AddAddress} from './AddAddress'
