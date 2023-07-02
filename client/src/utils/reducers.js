const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      // Add cases for different action types and update state accordingly
      default:
        return state;
    }
  };
  
  export default reducer;
  