import React from "react";
import { Link } from "react-router-dom";
export default class Inventario extends React.Component {
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
      const response = await fetch("http://localhost:4000");
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
        {this.state.data.map(character => (
          <li className="col-12 " key={character.id_productos}>
            <div to={`/See/${character.id_productos}`}>
              <div className=" p-2 m-2 bg-white rounded row">
                <img
                  className="col-2 img-fluid rounded"
                  src={character.imagen}
                  alt="imagen"
                />
                <div className="col-3 ">
                  <h2>{character.nombre}</h2>
                  <span class="badge badge-pill badge-info">
                    {character.plataforma}
                  </span>

                  <p>cantidad : {character.cantidad}</p>
                  <h4>${character.precio}</h4>
                  <Link
                    to={`/Productos/Mod/${character.id_productos}`}
                    className="btn btn-outline-primary"
                  >
                    Modificar
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
