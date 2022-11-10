import ReactDom from 'react-dom'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

import { HIDE_MODAL } from 'store/modal'

import 'components/Modal/style.css'
import { closeIcon } from 'assets/icons'

const Modal = ({ html }) => {
  const dispatch = useDispatch()
  const modalRef = useRef()

  const closeModal = (e) => e.target === modalRef.current && dispatch(HIDE_MODAL())

  return ReactDom.createPortal(
    <div className='modal' ref={modalRef} onClick={closeModal}>
      <div className='modal-content'>
        <button className='btn p-0 close' onClick={() => dispatch(HIDE_MODAL())}>
          <img src={closeIcon} alt='X' />
        </button>
        {html}
      </div>
    </div>,
    document.getElementById('portal'),
  )
}

export default Modal

// eslint-disable-next-line no-lone-blocks
{ /* <div className='container' ref={modalRef} onClick={closeModal}>
<div className='modal'>
  {html}
  <button className='btn p-0 close' onClick={() => dispatch(HIDE_MODAL())}>
    <img src={closeIcon} alt='X' />
  </button>
</div>
</div>, */ }
