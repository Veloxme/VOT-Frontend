import React from "react";
const Swal = require("sweetalert2");
export default class Modproduct extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null,
    nombre: "",
    descripcion: "",
    precio: "",
    plataforma: ""
  };

  componentDidMount() {
    this.loadElement();
  }

  loadElement = async e => {
    const id = this.props.match.params.id;
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:4000/see?id=${id}`);
      const data = await response.json();

      this.setState({
        loading: false,
        data: data,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
        plataforma: data[0].plataforma
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!"
      });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Modi = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        id_producto: this.props.match.params.id,
        plataforma: this.state.plataforma,
        precio: this.state.precio
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    try {
      await fetch("http://localhost:4000/modi", requestInfo);

      this.setState({
        loading: false
      });
      Swal.fire("Hecho!", "Producto Modificado", "success");
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!"
      });
    }
  };
  cancelar = () => {
    this.props.history.push(`/Productos/Inventario`);
  };

  render() {
    if (this.state.error) {
      return <p className="text-center text-white">error...</p>;
    }
    return (
      <div className="container">
        <div className="row">
          {this.state.data.map(producto => (
            <div className=" " key={producto.id_productos}>
              <div className=" p-2 m-2 bg-white rounded row">
                <img
                  className="col-4 rounded ancho"
                  src={producto.imagen}
                  alt="imagen"
                />
                <div className="col-8">
                  <form onSubmit={this.Modi}>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Nombre</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="nombre"
                          value={this.state.nombre}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Descripcion</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="descripcion"
                          value={this.state.descripcion}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Plataforma</label>
                        <input
                          type="text"
                          class="form-control"
                          id="platafoma"
                          name="plataforma"
                          value={this.state.plataforma}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Precio</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="precio"
                          value={this.state.precio}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>

                    <button class="btn btn-primary mr-3">Modificar</button>
                    <button class="btn btn-danger" onClick={this.cancelar}>
                      Cancelar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {this.state.loading && (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    );
  }
}
