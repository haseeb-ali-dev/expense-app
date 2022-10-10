import Menu from 'components/Menu'
import Person from 'components/Person'

const paymentSection = () => {
  const styling = { gridTemplateColumns: '1fr 2fr' }

  return (
    <div className='container-fluid pb-3'>
      <div className='d-grid gap-2' style={styling}>
        <div className='bg-light border rounded-2'>
          <Menu />
        </div>
        <div className='bg-light border rounded-2'>
          <Person />
        </div>
      </div>
    </div>
  )
}
export default paymentSection
