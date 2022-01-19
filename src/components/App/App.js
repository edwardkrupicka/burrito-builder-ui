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
    callOrder()
  }, [])

  const callOrder = async () => {
    const gotOrder = await getOrders('http://localhost:3001/api/v1/orders')
    console.log(gotOrder.orders)
    setOrders(gotOrder.orders)
  } 

  const addOrder = async (order) => {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    try {
    const fetchResponse = await fetch('http://localhost:3001/api/v1/orders', config)
    const json = await fetchResponse.json()
    console.log(json)
    if(!json){
      throw(json)
    }
    callOrder()
    } catch (err) {
      console.log(err)
      setError(error => [...error, err.error])
    }
  }

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={addOrder}/>
        </header>
        {error ? <h1>Oops</h1> : 
          <Orders orders={orders}/>
        }
      </main>
    );
  }


export default App;
