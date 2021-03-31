import { combineReducers } from "redux";

import {
  stateName as restaurants,
  reducer as RestaurantsReducer,
} from "./Restaurants";

export default combineReducers({
  [restaurants]: RestaurantsReducer,
});
