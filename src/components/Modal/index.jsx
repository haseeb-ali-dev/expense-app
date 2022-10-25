import ReactDom from 'react-dom'
import { useDispatch } from 'react-redux'
import React, { useRef } from 'react'

import { HIDE_MODAL } from 'store/modal'

import 'components/Modal/style.css'

const modal = ({ html }) => {
  const modalRef = useRef()
  const dispatch = useDispatch()

  const closeModal = (e) => e.target === modalRef.current && dispatch(HIDE_MODAL())

  return ReactDom.createPortal(
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className='container' ref={modalRef} onClick={closeModal}>
      <div className='modal'>
        {html}
        <button className='close' type='button' onClick={() => dispatch(HIDE_MODAL())}>X</button>
      </div>
    </div>,
    document.getElementById('portal'),
  )
}

export default modal
