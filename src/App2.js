import Navbar from 'components/Navbar2'
import Order from 'containers/order2'
import OrdersList from 'containers/ordersList'
import Payment from 'containers/payment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const app = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Order />} />
      <Route path='/orders' element={<OrdersList />} />
      <Route path='/payment' element={<Payment />} />
    </Routes>
  </Router>
)

export default app
