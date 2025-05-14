/*==================================================
/src/store/reducers/campus.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object. 
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */
import { FETCH_CAMPUS, EDIT_CAMPUS, CLEAR_CAMPUS } from "../actions/actionTypes";

// Define default Initial State as null (no campus loaded yet)
const initialState = null;

// REDUCER:
const campus = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAMPUS:
      return action.payload;  // full campus object
    case EDIT_CAMPUS:
      return action.payload;
    case CLEAR_CAMPUS:
      return initialState;
    default:
      return state;
  }
};

export default campus;
