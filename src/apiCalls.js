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
    // setError(error)
    return error
	}
}

export {getOrders}