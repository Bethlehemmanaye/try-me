import React from "react";
import SignInForm from "./SignInForm";

const SignIn = ({ addAuth }) => {
  return <SignInForm submit={addAuth} />;
};
export default SignIn;
