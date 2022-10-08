import Navbar from 'components/Navbar2'
import Order from 'containers/order2'
import Person from 'containers/person'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const app = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Order />} />
      <Route path='/orders' element={<Order />} />
      <Route path='/payment' element={<Person />} />
    </Routes>
  </Router>
)

export default app
