import ReactDom from 'react-dom'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'

import { HIDE_MODAL } from 'store/modal'

import 'components/Modal/style.css'

const modal = ({ html }) => {
  const dispatch = useDispatch()
  const modalRef = useRef()

  const closeModal = (e) => e.target === modalRef.current && dispatch(HIDE_MODAL())

  return ReactDom.createPortal(
    <div className='container' ref={modalRef} onClick={closeModal}>
      <div className='modal'>
        {html}
        <button className='close' onClick={() => dispatch(HIDE_MODAL())}>X</button>
      </div>
    </div>,
    document.getElementById('portal'),
  )
}

export default modal
