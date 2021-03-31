import { Fetch as FetchRestaurants } from "store/Restaurants";

export const load = () => (dispatch) => {
  dispatch(FetchRestaurants());
};
