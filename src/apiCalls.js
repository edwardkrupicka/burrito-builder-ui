// export const getOrders = () => {
//   return fetch('http://localhost:3001/api/v1/orders')
//       .then(response => response.json())
// }

const getOrders = async ( api, setOrders, setError ) => {
	try {
		const res = await fetch( api )
		const json = await res.json()
    console.log(json.orders)
		if(!json){
      throw(json.error)
    } else if (json) {
      return json
    }
	} 
	catch( error ) {
		console.log('Error fetching:', error)
    return error
	}
}

const postOrder = async (order) => {
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
  if(fetchResponse.status !== 201){
    throw(fetchResponse)
  }
  return fetchResponse
  } 
  catch (err) {
    console.log(err)
    return err
  }
}

export {getOrders, postOrder}