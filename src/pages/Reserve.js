import React from "react";
const Swal = require("sweetalert2");
export default class Reserve extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null,
    enganche: 0,
    minimo: 0
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
        data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }

    var min = this.state.data[0].precio * 0.2;
    this.setState({ minimo: min });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  Venta = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        enganche: this.state.enganche,
        id_producto: this.props.match.params.id,
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        telefono: this.state.telefono,
        direccion: this.state.direccion
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    if (this.state.enganche >= this.state.minimo) {
      try {
        await fetch("http://localhost:4000/reserve", requestInfo);

        this.setState({
          loading: false
        });
        Swal.fire("Hecho!", "Apartado Hecho", "success");
        this.props.history.push("/Store");
      } catch (error) {
        this.setState({
          loading: false,
          error: error
        });
      }
    } else {
      this.setState({
        loading: false,
        error: "enganche no admitido"
      });
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Ah ocurrido un error!"
      });
    }
  };

  cancelar = () => {
    this.props.history.push(`/See/${this.props.match.params.id}`);
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
                  <h4>${producto.precio}</h4>
                  <br />

                  <form onSubmit={this.Venta}>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Enganche</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="enganche"
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <fieldset disabled>
                          <label>Enganche minimo</label>
                          <input
                            type="text"
                            class="form-control"
                            name="minimo"
                            placeholder={this.state.minimo}
                          />
                        </fieldset>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Nombre Cliente</label>
                        <input
                          type="text"
                          class="form-control"
                          id="monto"
                          name="nombre"
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Apellido</label>
                        <input
                          type="text"
                          class="form-control"
                          name="apellido"
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>telefono</label>
                        <input
                          type="text"
                          class="form-control"
                          id="monto"
                          name="telefono"
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Direccion</label>
                        <input
                          type="text"
                          class="form-control"
                          name="direccion"
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>

                    <button class="btn btn-primary mr-3">Apartar</button>
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
