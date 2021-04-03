import React from "react";
import { Content } from "./index";

const EmptyLayout = ({ children, ...restProps }) => (
  <main className="cr-app" {...restProps}>
    <Content fluid>
      <div>{children}</div>
    </Content>
  </main>
);

export default EmptyLayout;
