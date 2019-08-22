import React from "react";
import { Link } from "react-router-dom";
import "./style/estilo.css";
class See extends React.Component {
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
      const response = await fetch(`http://localhost:4000/see?id=${id}`);
      const data = await response.json();

      this.setState({
        loading: false,
        data: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
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
                  <p>{producto.descripcion}</p>
                  <h4>${producto.precio}</h4>
                  <br />
                  <Link
                    to={`/Sell/${producto.id_productos}`}
                    type="button"
                    class="btn btn-success btn-lg mr-3"
                  >
                    Comprar
                  </Link>
                  <Link
                    to={`/Reserve/${producto.id_productos}`}
                    type="button"
                    class="btn btn-warning btn-lg"
                  >
                    Apartar
                  </Link>
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
export default See;
