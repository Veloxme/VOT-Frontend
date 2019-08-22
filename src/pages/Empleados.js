import React from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "../auth";
import Add from "./Addemple";
import Down from "./Downemple";
import { BrowserRouter, Switch } from "react-router-dom";
export default class Empleados extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <h1 className="text-white text-center mb-5">Empleados</h1>
          <div className="row">
            <div className="col-3">
              <Link
                to="/Empleados/Add"
                className="btn btn-primary btn-block btn-lg p-3 mb-5"
              >
                Agregar
              </Link>
              <Link
                to="/Empleados/Down"
                className="btn btn-info btn-block btn-lg p-3 mb-5"
              >
                Dar de baja
              </Link>
            </div>
            <div className="col">
              <Switch>
                <PrivateRoute exact path="/Empleados/Add" component={Add} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/Empleados/Down" component={Down} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
