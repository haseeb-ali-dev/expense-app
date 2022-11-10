import { lazy } from 'react'
import Select from 'react-select'
import swal from 'sweetalert'

const Delivery = lazy(() => import('components/Delivery'))
const EditItemForm = lazy(() => import('components/ItemForm/edit'))
const ForgotPassword = lazy(() => import('components/ForgotPassword'))
const Loader = lazy(() => import('components/Loader'))
const Item = lazy(() => import('components/Item'))
const ItemForm = lazy(() => import('components/ItemForm'))
const ItemSelect = lazy(() => import('components/ItemSelect'))
const MenuItems = lazy(() => import('components/MenuItems'))
const Modal = lazy(() => import('components/Modal'))
const Main = lazy(() => import('components/Main'))
const Navbar = lazy(() => import('components/Navbar'))
const OrderSummary = lazy(() => import('components/OrderSummary'))
const OrderActions = lazy(() => import('components/OrderActions'))
const OrderPersonItems = lazy(() => import('components/OrderPersonItems'))
const OrderSettleUp = lazy(() => import('components/OrderSettleUp'))
const OrderListItem = lazy(() => import('components/OrderListItem'))
const PersonItems = lazy(() => import('components/PersonItems'))
const PersonList = lazy(() => import('components/PersonList'))
const PersonSelect = lazy(() => import('components/PersonSelect'))
const PersonDetail = lazy(() => import('components/PersonDetail'))
const Payables = lazy(() => import('components/Payables'))
const Resturant = lazy(() => import('components/Resturant'))
const Receivables = lazy(() => import('components/Receivables'))
const Tip = lazy(() => import('components/Tip'))
const Tax = lazy(() => import('components/Tax'))

export {
  Delivery,
  EditItemForm,
  ForgotPassword,
  Loader,
  Item,
  ItemForm,
  ItemSelect,
  MenuItems,
  Modal,
  Main,
  Navbar,
  OrderSummary,
  OrderActions,
  OrderListItem,
  OrderPersonItems,
  OrderSettleUp,
  PersonItems,
  PersonList,
  PersonSelect,
  PersonDetail,
  Payables,
  Resturant,
  Receivables,
  Select,
  swal,
  Tip,
  Tax,
}
