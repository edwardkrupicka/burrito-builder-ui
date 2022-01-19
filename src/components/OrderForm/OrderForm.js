import React, { useState, useEffect } from 'react';

const OrderForm  = () => {
  const [state, setState] = useState({
    name: '',
    ingredients: []
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
   setState({name: '', ingredients: []});
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setState({...state, name: e.target.value})
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
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

      <p>Order: { state.ingredients.join(', ') || 'Nothing selected' }</p>

      <button disabled={!state.name.length || !state.ingredients.length} onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
