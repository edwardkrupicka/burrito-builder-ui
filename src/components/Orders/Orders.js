import React from 'react';
import './Orders.css';
import PropTypes from 'prop-types';

const Orders = ({ orders }) => {
    const orderEls = orders.map(order => {
      return (
        <div className="order" key={order.id}>
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient} >{ingredient}</li>
            })}
          </ul>
        </div>
      )
    })

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

Orders.propTypes = {
  orders: PropTypes.array.isRequired
}

export default Orders;