import Navbar from 'components/Navbar'
import Order from 'containers/order'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<Order />} />
      <Route path='/order' element={<Order />} />
      <Route path='/person' element={<Order />} />
    </Routes>
  </Router>
)

export default App
