import * as types from "../actionTypes";

export const addToCart = (product) => (dispatch) => {
  dispatch({ type: types.ADD_TO_CART, payload: product });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({ type: types.REMOVE_FROM_CART, payload: productId });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: types.CLEAR_CART });
};
