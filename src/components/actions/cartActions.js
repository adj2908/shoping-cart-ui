import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  LOAD_DATA_LOADED,
  LOAD_DATA_LOADING,
  DROPDOWN_FILTER,
  SEARCH_FILTER,
  LOAD_FAILURE
} from "./action-types/cart-actions";

import axios from "axios";

export const loadData = () => {
  return async dispatch => {
    dispatch({ type: LOAD_DATA_LOADING });
    return await axios
      .get("https://mocki.io/v1/cc27e873-10f3-4dd0-927b-5d0a29247269")
      .then(
        response => {
          dispatch({ type: LOAD_DATA_LOADED, response });
        },
        err => dispatch({ type: LOAD_FAILURE, err })
      );
  };
};

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id // payload
  };
};
//remove item action
export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id // payload
  };
};
//subtract qt action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id // payload
  };
};
//add qt action

export const dropdownFilter = id => {
  return {
    type: DROPDOWN_FILTER,
    id // payload
  };
};
export const searchFilter = id => {
  return {
    type: SEARCH_FILTER,
    id // payload
  };
};
