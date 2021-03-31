import React, { useContext, useEffect } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableFooter from "./TableFooter";
import {
  Table as ReactstrapTable,
  CardHeader,
  Card,
  CardFooter,
} from "reactstrap";
import { MainContext } from "../../context/Main/";
import { connect } from "react-redux";

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
    <Card className="p-2 border-0">
      <CardHeader className="tableHeaders border-0">
        <div>{"" + title ? title : ""}</div>
      </CardHeader>
      <ReactstrapTable hover>
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
export const TableComponent = ({
  columns,
  Component,
  props,
  data,
  callback,
  callBegan,
  callSuccess,
  innerData,
}) => {
  const isLoading = data === null;
  return (
    <ReactstrapTable className="uk-table uk-table-hover uk-table-middle uk-table-divider">
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={6} className="uk-text-center">
              <em className="uk-text-muted">Loading...</em>
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <Component
              className="uk-table uk-table-hover uk-table-middle uk-table-divider"
              {...props(item, index)}
              content={item}
              index={index}
              innerData={innerData}
              data={item}
              callback={callback}
              stats={{ req: callBegan, success: callSuccess }}
            />
          ))
        )}
      </tbody>
    </ReactstrapTable>
  );
};

export default connect(mapStateToProps)(Table);
