import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = ({ addUser }) => {
  return <SignUpForm submit={addUser} />;
};
export default SignUp;
