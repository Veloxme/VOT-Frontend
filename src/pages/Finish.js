import React from "react";
const Swal = require("sweetalert2");
class Finish extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null
  };

  componentDidMount() {
    this.loadElement();
  }

  loadElement = async e => {
    const id = this.props.match.params.id;
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `http://localhost:4000/see/apartado?id=${id}`
      );
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

    var faltantes = this.state.data[0].precio - this.state.data[0].enganche;
    this.setState({
      faltante: faltantes
    });
  };

  changeHandler = e => {
    var costo = this.state.cantidad - this.state.faltante;
    this.setState({
      [e.target.name]: e.target.value,

      cambio: costo
    });
  };

  finalizar = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        id_producto: this.state.data[0].id_producto,
        total: this.state.data[0].precio,
        id_apartados: this.props.match.params.id
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    if (this.state.cantidad >= this.state.faltante) {
      try {
        await fetch("http://localhost:4000/final", requestInfo);

        this.setState({
          loading: false
        });
        Swal.fire("Hecho!", "Apartado Finalizado", "success");
        this.props.history.push("/Apartados");
      } catch (error) {
        this.setState({
          loading: false,
          error: error
        });
      }
    } else {
      this.setState({
        loading: false,
        error: "ponle mas lana"
      });
    }
  };

  cancelar = () => {
    this.props.history.push(`/Aapartados`);
  };
  render() {
    if (this.state.error) {
      return <p className="text-center text-white">error...</p>;
    }
    return (
      <div className="container">
        <div className="row">
          {this.state.data.map(producto => (
            <div className=" " key={producto.id_apartados}>
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
                  <p>telefono : {producto.telefono}</p>
                  <p>direccion : {producto.direccion}</p>
                  <p>monto : {producto.precio}</p>
                  <p>enganche: {producto.enganche}</p>

                  <br />
                  <form onSubmit={this.finalizar}>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label>Cantidad</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="cantidad"
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div class="form-group col-md-4">
                        <fieldset disabled>
                          <label>Cantidad faltante</label>
                          <input
                            type="text"
                            class="form-control"
                            name="faltante"
                            placeholder={this.state.faltante}
                          />
                        </fieldset>
                      </div>
                      <div class="form-group col-md-4">
                        <fieldset disabled>
                          <label>Cambio</label>
                          <input
                            type="text"
                            class="form-control"
                            name="cambio"
                            placeholder={this.state.cambio}
                          />
                        </fieldset>
                      </div>
                    </div>
                    <button class="btn btn-success btn-lg mr-3">
                      Finalizar
                    </button>
                    <button
                      onClick={this.cancelar}
                      class="btn btn-danger btn-lg"
                    >
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
export default Finish;
