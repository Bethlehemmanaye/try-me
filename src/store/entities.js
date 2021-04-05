import { combineReducers } from "redux";
import {
  stateName as restaurants,
  reducer as RestaurantsReducer
} from "./Restaurants";
import { stateName as users, reducer as UsersReducer } from "./Users";
import { stateName as orders, reducer as OrdersReducer } from "./Orders";
import { stateName as foods, reducer as FoodsReducer } from "./Foods";
import {
  stateName as customers,
  reducer as CustomersReducer
} from "./Customers";
import {
  stateName as feedbacks,
  reducer as FeedbacksReducer
} from "./Feedbacks";
import {
  stateName as restaurant_owners,
  reducer as RestaurantOwners
} from "./RestaurantOwners";

import { stateName as auth, reducer as authReducer } from "./Auth";
import {
  stateName as category,
  reducer as categoryReducer
} from "./Categories";

export default combineReducers({
  [restaurants]: RestaurantsReducer,
  [users]: UsersReducer,
  [orders]: OrdersReducer,
  [foods]: FoodsReducer,
  [customers]: CustomersReducer,
  [feedbacks]: FeedbacksReducer,
  [restaurant_owners]: RestaurantOwners,
  [auth]: authReducer,
  [category]: categoryReducer
});
