import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const allReducers = combineReducers({
  cartProducts: cartReducer
});

export default allReducers;
