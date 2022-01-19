import React, { useState } from 'react';
import PropTypes from 'prop-types';

const OrderForm  = ({ addOrder }) => {
  const [state, setState] = useState({
    name: '',
    ingredients: []
  })
  const [missing, setMissing] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    if(state.name && state.ingredients.length) {
    addOrder(state)
    clearInputs();
    } else {
      setMissing(true)
      console.log('Youre missing a name or ingredients')
    }
  }

  const clearInputs = () => {
   setState({name: '', ingredients: []});
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setMissing(false)
    setState({...state, name: e.target.value})
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
    setMissing(false)
    if(state.ingredients.find(ingredient => e.target.name === ingredient)) {
      setState({...state, ingredients: state.ingredients.filter(ingredient => e.target.name !== ingredient) })
    } else {
    setState({ ...state, ingredients: [...state.ingredients, e.target.name] })
    }
  }

  

    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={(e) => handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    })

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={state.name}
        onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }
      {missing ? <p>You need to enter all of the input fields!</p> : 
      <p>Order: { state.ingredients.join(', ') || 'Nothing selected' }</p>
      }

      <button disabled={false} onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

OrderForm.propTypes = {
  addOrder: PropTypes.func,
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired
  })
}

export default OrderForm;
