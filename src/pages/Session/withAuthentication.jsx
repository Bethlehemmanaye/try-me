import React from "react";

import AuthUserContext from "./context";
import auth from "services/authService";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      const authUser = auth.getCurrentUser();

      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
