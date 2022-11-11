import { lazy } from 'react'
import Select from 'react-select'
import swal from 'sweetalert'

export const Delivery = lazy(() => import('components/Delivery'))
export const EditItemForm = lazy(() => import('components/ItemForm/edit'))
export const ForgotPassword = lazy(() => import('components/ForgotPassword'))
export const FacebookLogin = lazy(() => import('components/FacebookLogin'))
export const GoogleLogin = lazy(() => import('components/GoogleLogin'))
export const Loader = lazy(() => import('components/Loader'))
export const Item = lazy(() => import('components/Item'))
export const ItemForm = lazy(() => import('components/ItemForm'))
export const ItemSelect = lazy(() => import('components/ItemSelect'))
export const MenuItems = lazy(() => import('components/MenuItems'))
export const Modal = lazy(() => import('components/Modal'))
export const Main = lazy(() => import('components/Main'))
export const Navbar = lazy(() => import('components/Navbar'))
export const OrderSummary = lazy(() => import('components/OrderSummary'))
export const OrderActions = lazy(() => import('components/OrderActions'))
export const OrderPersonItems = lazy(() => import('components/OrderPersonItems'))
export const OrderSettleUp = lazy(() => import('components/OrderSettleUp'))
export const OrderListItem = lazy(() => import('components/OrderListItem'))
export const PersonItems = lazy(() => import('components/PersonItems'))
export const PersonList = lazy(() => import('components/PersonList'))
export const PersonSelect = lazy(() => import('components/PersonSelect'))
export const PersonDetail = lazy(() => import('components/PersonDetail'))
export const Payables = lazy(() => import('components/Payables'))
export const Resturant = lazy(() => import('components/Resturant'))
export const Receivables = lazy(() => import('components/Receivables'))
export const Tip = lazy(() => import('components/Tip'))
export const Tax = lazy(() => import('components/Tax'))

export {
  Select,
  swal,
}
