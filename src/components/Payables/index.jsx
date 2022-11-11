/* eslint-disable no-param-reassign */
import { HIDE_MODAL } from 'store/modal'
import { memo } from 'react'
import ReactTooltip from 'react-tooltip'

import { settleUp } from 'api/order'
import { UPDATE_ORDER_PERSONS } from 'store/orderList'

import { ok2Icon } from 'assets/icons'

const Payables = ({
  person, order, loading, setLoading, dispatch, pIndex,
}) => {
  const settleUpPayable = async (personIdx, { name: rName, amount }, rIndex) => {
    setLoading(true)
    const toIndex = order.persons.findIndex(p => p.name === rName)
    const personName = order.persons[personIdx].name
    const updatedPersons = order.persons.map(({
      name, items, from, to, paid, total, balance,
    }, index) => {
      if (index === toIndex) {
        balance -= amount
        paid -= amount
        const temp1 = [...from]
        temp1.splice(temp1.indexOf({ name: personName, amount }), 1)
        from = temp1
      }
      if (index === personIdx) {
        balance += amount
        paid += amount
        const temp2 = [...to]
        temp2.splice(rIndex, 1)
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

  return person.to.length > 0
    && (
      <>
        <div className='fs-6 mt-2 text-danger'>Payables</div>
        <div>
          <ul className='list-group'>
            {person.to.map((r, rIndex) => (
              <li className='list-group-item bg-light fst-italic p-0' key={r.name}>
                Rs. {r.amount} to {r.name}
                {loading ? <span className='text-danger mx-1 p-0 float-end'>...</span>
                  : (
                    <button className='btn btn-sm mx-1 p-0 float-end' data-tip={`Settle Up ${person.name}`} onClick={() => settleUpPayable(pIndex, r, rIndex)}>
                      <img src={ok2Icon} alt='ok' />
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

export default memo(Payables)
