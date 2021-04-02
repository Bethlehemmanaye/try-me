import { combineReducers } from "redux";

import {
  stateName as restaurants,
  reducer as RestaurantsReducer,
} from "./Restaurants";
import {
  stateName as restaurant_owners,
  reducer as RestaurantOwnersReducer,
} from "./RestaurantOwners";
import { stateName as orders, reducer as OrdersReducer } from "./Orders";

export default combineReducers({
  [restaurants]: RestaurantsReducer,
  [restaurant_owners]: RestaurantOwnersReducer,
  [orders]: OrdersReducer,
});
