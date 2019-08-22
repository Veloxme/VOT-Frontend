import React from "react";
import { Link } from "react-router-dom";
export default class Pedirproveedor extends React.Component {
  state = {
    loading: true,
    error: null,
    data: [],
    search: null
  };

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/pedirproveedor");
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
      <ul className="row">
        {this.state.data.map(agotado => (
          <li className="col-12 " key={agotado.id_productos}>
            <div to={`/See/${agotado.id_productos}`}>
              <div className=" p-2 m-2 bg-white rounded row">
                <img
                  className="col-2  rounded"
                  src={agotado.imagen}
                  alt="imagen"
                />
                <div className="col-3 ">
                  <h2>{agotado.nombre}</h2>
                  <span class="badge badge-pill badge-info">
                    {agotado.plataforma}
                  </span>

                  <p>cantidad : {agotado.cantidad}</p>
                  <h4>${agotado.precio}</h4>
                  <Link
                    to={`/Productos/Pedir/${agotado.id_productos}`}
                    className=" btn btn-outline-primary "
                  >
                    Solicitar Producto
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}

        {this.state.loading && (
          <p className="text-center text-white">Loading...</p>
        )}
      </ul>
    );
  }
}
