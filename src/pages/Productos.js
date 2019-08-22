import React from "react";
import { Link } from "react-router-dom";

import PrivateRoute from "../auth";
import Inventario from "./Inventario";
import AddProduct from "../pages/AddProduct";
import Pedirproveedor from "../pages/Pedirproveedor";
import Modificar from "../pages/Modproduct";
import Pedir from "../pages/Pedir";
import Rventa from "../pages/Reporteventa";
import Rapartados from "../pages/Reporteapartado";

import { BrowserRouter, Switch } from "react-router-dom";

export default class Productoos extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <h1 className="text-white text-center mb-5">Productos</h1>
          <div className="row">
            <div className="col-3">
              <Link
                to="/Productos/Inventario"
                className="btn btn-primary btn-block btn-lg p-3 mb-5"
              >
                Inventario
              </Link>
              <Link
                to="/Productos/Add"
                className="btn btn-info btn-block btn-lg p-3 mb-5"
              >
                Agregar
              </Link>
              <Link
                to="/Productos/Pedir"
                className="btn btn-warning btn-block btn-lg p-3 mb-5"
              >
                Solicitar a Proveedor
              </Link>
              <Link
                to="/Productos/Ventas"
                className="btn btn-secondary btn-block btn-lg p-3 mb-5"
              >
                Reporte de ventas
              </Link>
              <Link
                to="/Productos/Apartados"
                className="btn btn-success btn-block btn-lg p-3 mb-5"
              >
                Reporte de apartados
              </Link>
            </div>
            <div className="col">
              <Switch>
                <PrivateRoute
                  exact
                  path="/Productos/Inventario"
                  component={Inventario}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Add"
                  component={AddProduct}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Pedir"
                  component={Pedirproveedor}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Mod/:id"
                  component={Modificar}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Pedir/:id"
                  component={Pedir}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Ventas"
                  component={Rventa}
                />
                <PrivateRoute
                  exact
                  path="/Productos/Apartados"
                  component={Rapartados}
                />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
