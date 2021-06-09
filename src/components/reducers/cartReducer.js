import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  LOAD_DATA_LOADED,
  LOAD_DATA_LOADING,
  DROPDOWN_FILTER,
  SEARCH_FILTER,
  LOAD_FAILURE,
  EMPTY_CART
} from "../actions/action-types/cart-actions";

const initState = {
  addedItems: [],
  total: 0,
  networkData: [],
  filteredData: [],
  loading: true,
  error: false
};
const cartReducer = (state = initState, action) => {
  if (action.type === LOAD_DATA_LOADING) {
    return {
      ...state,
      loading: true,
      error: false
    };
  }
  if (action.type === LOAD_DATA_LOADED) {
    return {
      ...state,
      networkData: action.response.data.products,
      filteredData: action.response.data.products,
      loading: false
    };
  }
  if (action.type === LOAD_FAILURE) {
    return {
      loading: false,
      error: true
    };
  }
  if (action.type === ADD_TO_CART) {
    let addedItem = state.networkData.find(item => item.id === action.id);
    //check if the action id exists in the addedItems
    let existedItem = state.addedItems.find(item => action.id === item.id);
    if (existedItem) {
      let newQuantity = existedItem.quantity + 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: state.addedItems.map(e => {
          if (e.id === action.id) {
            e = { ...e, quantity: newQuantity };
          }
          return e;
        }),
        total: newTotal
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id);
    let new_items = state.addedItems.filter(item => action.id !== item.id);

    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: new_items,
      total: newTotal
    };
  }

  if (action.type === SUB_QUANTITY) {
    let existedItem = state.addedItems.find(item => action.id === item.id);
    let newQuantity = existedItem.quantity - 1;
    let newTotal = state.total - existedItem.price;

    if (existedItem.quantity === 1) {
      //if the qt == 0 then it should be removed
      let newItems = state.addedItems.filter(item => item.id !== action.id);
      return {
        ...state,
        addedItems: newItems,
        total: newTotal
      };
    } else {
      return {
        ...state,
        addedItems: state.addedItems.map(e => {
          if (e.id === action.id) {
            e = { ...e, quantity: newQuantity };
          }
          return e;
        }),
        total: newTotal
      };
    }
  }

  if (action.type === EMPTY_CART) {
    return {
      ...state,
      addedItems: []
    };
  }
  if (action.type === DROPDOWN_FILTER) {
    if (action.id === "") {
      return {
        ...state,
        filteredData: state.networkData
      };
    } else {
      let filtered = state.filteredData.filter(a => a.type === action.id);
      return {
        ...state,
        filteredData: filtered
      };
    }
  }
  if (action.type === SEARCH_FILTER) {
    if (action.id !== "") {
      let filtered = state.filteredData.filter(val => {
        if (
          val.name.toLowerCase().includes(action.id.toLowerCase()) ||
          val.type.toLowerCase().includes(action.id.toLowerCase())
        ) {
          return val;
        }
        return null;
      });
      return {
        ...state,
        filteredData: filtered
      };
    } else {
      return {
        ...state,
        filteredData: state.networkData
      };
    }
  } else {
    return state;
  }
};

export default cartReducer;
