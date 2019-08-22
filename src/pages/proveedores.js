import React from "react";
import { Link } from "react-router-dom";
import PrivateRoute from "../auth";
import Add from "../pages/Addproveedor";
import Show from "../pages/Downproveedores";
import { BrowserRouter, Switch } from "react-router-dom";

export default class Productoos extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <h1 className="text-white text-center mb-5">Proveedores</h1>
          <div className="row">
            <div className="col-3">
              <Link
                to="/Proveedor/Add"
                className="btn btn-primary btn-block btn-lg p-3 mb-5"
              >
                Agregar
              </Link>
              <Link
                to="/Proveedor/Show"
                className="btn btn-info btn-block btn-lg p-3 mb-5"
              >
                Mostrar
              </Link>
            </div>
            <div className="col">
              <Switch>
                <PrivateRoute exact path="/Proveedor/Add" component={Add} />
                <PrivateRoute exact path="/Proveedor/Show" component={Show} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
