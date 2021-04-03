import { MainContext } from "context/Main/";
import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardFooter,
  CardHeader,
  Table as ReactstrapTable,
} from "reactstrap";
import TableBody from "./tableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./tableHeader";

const Table = ({ columns, data, title, state, getLoading }) => {
  // let objectSet = {};
  useEffect(() => {
    if (typeof getLoading === "function") {
      // const result = status(state)
      // console.log("result", getLoading(state, { isPatch: true }));
    }
  }, [state, getLoading]);
  const { rootState } = useContext(MainContext);

  useEffect(() => {
    try {
      // setCurrenctTab(activeTab)
    } catch (err) {}
  }, [rootState]);

  return (
    <Card className="m-2 p-3">
      <CardHeader className="cardHeader">
        <div>{"" + title ? title : ""}</div>
      </CardHeader>
      <ReactstrapTable hover borderless>
        <TableHeader columns={columns} />
        <TableBody data={data} columns={columns} />
      </ReactstrapTable>
      <CardFooter>
        <TableFooter />
      </CardFooter>
    </Card>
  );
};
const mapStateToProps = (state, ownProps) => ({ state, ...ownProps });

export default connect(mapStateToProps)(Table);
