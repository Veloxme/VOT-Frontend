import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Admin extends Component {
  closeseccion = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="text-white text-center mb-3">Admin</h1>
          <div className="row justify-content-md-center m-3">
            <button class="btn btn-danger " onClick={this.closeseccion}>
              cerrar sesion
            </button>
          </div>
          <div className="row">
            <Link to="/Store" className=" p-5 m-2 bg-success rounded col">
              <h1 className="text-center">Tienda</h1>
            </Link>

            <Link to="/Apartados" className=" p-5 m-2 bg-warning rounded col ">
              <h1 className="text-center">Apartados</h1>
            </Link>
          </div>
          <div className="row">
            <Link to="/Productos" className=" p-5 m-2 bg-info rounded col">
              <h1 className="text-center">Productos</h1>
            </Link>
            <Link to="/Empleado" className=" p-5 m-2 bg-secondary rounded col ">
              <h1 className="text-center">Empleados</h1>
            </Link>
            <Link to="/Proveedor" className=" p-5 m-2 bg-success rounded col ">
              <h1 className="text-center">Proveedores</h1>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
