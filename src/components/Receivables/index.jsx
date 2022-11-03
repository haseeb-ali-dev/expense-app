/* eslint-disable no-param-reassign */
import { HIDE_MODAL } from 'store/modal'
import ReactTooltip from 'react-tooltip'
import { memo } from 'react'
import { settleUp } from 'api/order'
import { UPDATE_ORDER_PERSONS } from 'store/orderList'

import { okIcon } from 'assets/icons'

const Receivables = ({
  person, order, loading, setLoading, dispatch, pIndex,
}) => {
  const settleUpReceivable = async (personIdx, { name: sNamee, amount }, sIndex) => {
    setLoading(true)
    const fromIndex = order.persons.findIndex(p => p.name === sNamee)
    const personName = order.persons[personIdx].name
    const updatedPersons = order.persons.map(({
      name, items, from, to, paid, total, balance,
    }, index) => {
      if (index === personIdx) {
        balance -= amount
        paid -= amount
        const temp1 = [...from]
        temp1.splice(sIndex, 1)
        from = temp1
      }
      if (index === fromIndex) {
        balance += amount
        paid += amount
        const temp2 = [...to]
        temp2.splice(temp2.indexOf({ name: personName, amount }), 1)
        to = temp2
      }
      return {
        name, items, from, to, paid, total, balance,
      }
    })
    const allFlag = updatedPersons.every(p => p.balance === 0)
    await settleUp(order.id, updatedPersons, allFlag).then(() => {
      setLoading(false)
      dispatch(UPDATE_ORDER_PERSONS({ orderId: order.id, persons: updatedPersons, all: allFlag }))
      dispatch(HIDE_MODAL())
    })
  }

  return person.from.length > 0
    && (
      <>
        <div className='fs-6 mt-2 text-success'>Receivables</div>
        <div>
          <ul className='list-group'>
            {person.from.map((s, sIndex) => (
              <li className='list-group-item bg-light fst-italic p-0' key={s.name}>
                Rs. {s.amount.toLocaleString('en-US')} from {s.name}
                {loading ? <span className='text-success mx-2 p-0 float-end'>...</span>
                  : (
                    <button className='btn btn-sm mx-1 p-0 float-end' data-tip={`Settle Up ${person.name}`} onClick={() => settleUpReceivable(pIndex, s, sIndex)}><img src={okIcon} alt='ok' />
                    </button>
                  )}
              </li>
            ))}
          </ul>
        </div>
        <ReactTooltip />
      </>
    )
}

export default memo(Receivables)
