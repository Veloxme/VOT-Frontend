import React from "react";
const Swal = require("sweetalert2");
export default class Pedir extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null
  };

  componentDidMount() {
    this.loadElement();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadElement = async e => {
    const id = this.props.match.params.id;
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:4000/see?id=${id}`);
      const data = await response.json();

      this.setState({
        loading: false,
        data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };

  cancelar = () => {
    this.props.history.push(`/Productos/Pedir`);
  };

  pedir = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        cantidad: this.state.cantidad,
        id_producto: this.props.match.params.id
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    try {
      await fetch("http://localhost:4000/pedirproveedor", requestInfo);

      this.setState({
        loading: false
      });
      Swal.fire("Hecho!", "Producto pedido", "success");
      this.props.history.push("/Productos/Pedir");
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
                  <h3>{producto.nombre}</h3>
                  <span class="badge badge-pill badge-info">
                    {producto.plataforma}
                  </span>
                  <br />
                  <br />

                  <h4>${producto.precio}</h4>
                  <br />
                  <form onSubmit={this.pedir}>
                    <div class="form-group col-md-6">
                      <label>Numero de productos a pedir</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cantidad"
                        name="cantidad"
                        onChange={this.changeHandler}
                      />
                    </div>
                    <button class="btn btn-success mr-3 ">Pedir</button>
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
