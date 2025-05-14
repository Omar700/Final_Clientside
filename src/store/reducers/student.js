/*==================================================
/src/store/reducers/student.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object. 
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */
import { FETCH_STUDENT, CLEAR_STUDENT } from "../actions/actionTypes";  // Import Action Types

// REDUCER:
const student = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENT:
      return action.payload;
    case CLEAR_STUDENT:
      return {};  // Clear student from state
    default:
      return state;
  }
};

export default student;