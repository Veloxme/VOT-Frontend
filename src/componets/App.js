import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../auth";
import PublicRoute from "../Withoutauth";

import Layout from "./Layout";
import Home from "../pages/Home";
import Service from "../pages/Service";
import Store from "../pages/Store";
import See from "../pages/See";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import sell from "../pages/Sell";
import Reserve from "../pages/Reserve";
import Apartados from "../pages/Apartados";
import Finish from "../pages/Finish";
import Productos from "../pages/Productos";
import Empleado from "../pages/Empleados";
import Proveedor from "../pages/proveedores";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Service" component={Service} />
          <PublicRoute exact path="/Login" component={Login} />
          <Route exact path="/Store" component={Store} />
          <PrivateRoute exact path="/See/:id" component={See} />
          <PrivateRoute exact path="/Admin" component={Admin} />
          <PrivateRoute exact path="/Apartados" component={Apartados} />
          <PrivateRoute exact path="/Productos" component={Productos} />
          <PrivateRoute exact path="/Empleado" component={Empleado} />
          <PrivateRoute exact path="/Proveedor" component={Proveedor} />
          <PrivateRoute exact path="/Sell/:id" component={sell} />
          <PrivateRoute exact path="/Reserve/:id" component={Reserve} />
          <PrivateRoute exact path="/Finish/:id" component={Finish} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
