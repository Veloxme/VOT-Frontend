import React from "react";
import { Link } from "react-router-dom";

export default class Apartado extends React.Component {
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
      const response = await fetch("http://localhost:4000/apartados");
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
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.state.search) {
      this.fetchCharacters();
    } else {
      this.setState({ loading: true, error: null });
      const search = this.state.search;
      console.log(search);
      try {
        const response = await fetch(
          `http://localhost:4000/buscar/apartado?search=${search}`
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
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar Apartado"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                name="search"
                onChange={this.changeHandler}
              />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" id="button-addon2">
                  Buscar
                </button>
              </div>
            </div>
          </form>
          <ul className="row">
            {this.state.data.map(character => (
              <li className="col-12 " key={character.id_apartados}>
                <Link to={`/Finish/${character.id_apartados}`}>
                  <div className=" p-2 m-2 bg-white rounded row">
                    <img
                      className="col-2  rounded"
                      src={character.imagen}
                      alt="imagen"
                    />
                    <div className="col-10 ">
                      <h2>{character.nombre}</h2>
                      <span class="badge badge-pill badge-info">
                        {character.plataforma}
                      </span>
                      {/* <p>{character.descripcion}</p> */}
                      <br />
                      <br />
                      <h4>{character.telefono}</h4>
                      <h4>apartado el {character.fecha.split("T", 1)}</h4>
                      <h3>Enganche: ${character.enganche}</h3>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {this.state.loading && (
            <p className="text-center text-white">Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}
