import React, { useState, useEffect } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = () => {

  const [orders, setOrders] = useState([])
  const [error, setError] = useState(false)

  console.log(error)

  useEffect(() => {
    const callOrder = async () => {
      const gotOrder = await getOrders('http://localhost:3001/api/v1/orders')
      console.log(gotOrder.orders)
      setOrders(gotOrder.orders)
    } 
    callOrder()
  }, [])

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        {error ? <h1>Oops</h1> : 
          <Orders orders={orders}/>
        }
      </main>
    );
  }


export default App;
