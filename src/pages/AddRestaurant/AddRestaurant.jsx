import CommonModals from "common/CommonModal";
import { initialState, reducer, _toggle } from "common/ModalOptions";
import React, { useEffect, useReducer } from "react";
import { Button, NavItem, NavLink } from "reactstrap";
import RestaurantForm from "./RestaurantForm";

const AddRestaurant = ({ doneAdd, doneEdit, addRestaurant, options }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (doneAdd || doneEdit) {
      _toggle({ type: "CLOSE" }, dispatch);
    }
  }, [doneAdd, doneEdit]);

  return (
    <NavItem>
      <CommonModals
        size="xl"
        data={state.data}
        openModal={state.openModal}
        component={state.Component}
        toggle={_toggle}
        dispatch={dispatch}
        title={state.title}
      />
      <NavLink>
        <Button
          onClick={() =>
            _toggle(
              {
                type: "ADD",
                Component: RestaurantForm,
                submit: addRestaurant,
                title: "New Restaurant",
                options
              },
              dispatch
            )
          }
        >
          Add Restaurant
        </Button>
      </NavLink>
    </NavItem>
    // <RestaurantForm
    //   submit={addRestaurant}
    //   options={options}
    //   doneAdd={doneAdd}
    //   doneEdit={doneEdit}
    // />
  );
};
export default AddRestaurant;
