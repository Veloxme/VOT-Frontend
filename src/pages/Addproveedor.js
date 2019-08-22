import React from "react";
const Swal = require("sweetalert2");
export default class Addproveedor extends React.Component {
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  click = e => {
    Swal.fire("click");
  };
  handleSubmit = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        user: this.state.user,
        password: this.state.password,
        direccion: this.state.direccion,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        telefono: this.state.telefono
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    try {
      await fetch("http://localhost:4000/add/proveedor", requestInfo);

      this.setState({
        loading: false,
        user: "",
        password: "",
        direccion: "",
        nombre: "",
        apellido: "",
        telefono: ""
      });
      document.getElementById("direccion").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("telefono").value = "";

      Swal.fire("Hecho!", "Proveedor agregado", "success");
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-white text-center mb-5">Agregar</h1>
        <form onSubmit={this.handleSubmit}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                id="nombre"
                name="nombre"
                class="form-control"
                placeholder="Nombre"
                onChange={this.changeHandler}
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                id="apellido"
                name="apellido"
                class="form-control"
                placeholder="Apellido"
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <input
                type="text"
                id="direccion"
                name="direccion"
                class="form-control"
                placeholder="Direccion"
                onChange={this.changeHandler}
              />
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                id="telefono"
                name="telefono"
                class="form-control"
                placeholder="Telefono"
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className="row">
            <button class="btn btn-primary mx-auto btn-lg col-2">
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
