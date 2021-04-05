import { Fetch as FetchRestaurants } from "store/Restaurants";
import { Fetch as fetchFoods } from "store/Foods";
import { Fetch as fetchCategories } from "store/Categories";

export const load = () => dispatch => {
  dispatch(FetchRestaurants());
  dispatch(fetchFoods());
  dispatch(fetchCategories());
};
