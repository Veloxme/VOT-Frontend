import React from "react";
const Swal = require("sweetalert2");
export default class Sell extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null,
    monto: null,
    cantidad: null,
    total: null,
    cambio: null
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
    var algo = this.state.cantidad * this.state.data[0].precio;
    var costo = algo - this.state.monto;
    this.setState({ total: algo, cambio: costo });
  };

  changeHandler = e => {
    var algo = this.state.cantidad * this.state.data[0].precio;
    var costo = (algo - this.state.monto) * -1;
    this.setState({
      [e.target.name]: e.target.value,
      total: algo,
      cambio: costo
    });
  };

  Venta = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        cantidad: this.state.cantidad,
        total: this.state.total,
        id_producto: this.props.match.params.id
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    if (
      this.state.monto !== null ||
      this.state.total !== null ||
      this.state.cantidad !== null ||
      this.state.cambio !== null
    ) {
      if (this.state.monto >= this.state.total) {
        try {
          await fetch("http://localhost:4000/sell", requestInfo);

          this.setState({
            loading: false
          });
          Swal.fire("Hecho!", "Venta Hecha", "success");
          this.props.history.push("/Store");
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
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Ah ocurrido un error!"
        });
      }
    } else {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Rellene todos los campos!"
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
                        <label>Cantidad</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cantidad"
                          name="cantidad"
                          onChange={this.changeHandler}
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <fieldset disabled>
                          <label>Total</label>
                          <input
                            type="text"
                            class="form-control"
                            name="total"
                            placeholder={this.state.total}
                          />
                        </fieldset>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Monto</label>
                        <input
                          type="text"
                          class="form-control"
                          id="monto"
                          name="monto"
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div class="form-group col-md-6">
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

                    <button class="btn btn-primary mr-3">Vender</button>
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
