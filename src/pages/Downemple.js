import React from "react";
const Swal = require("sweetalert2");
export default class Downemple extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      data: [],
      search: null
    };

    this.activar = this.activar.bind(this);
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/empleados");
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

  activar = async (e, id) => {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        id: e
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    try {
      const response = await fetch("http://localhost:4000/cambio", requestInfo);
      const data = await response.json();
      console.log(data);
      this.setState({
        loading: false
      });
      Swal.fire("Hecho!", "Empleado cambiado", "success");
      this.fetchCharacters();
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
      <ul className="row">
        {this.state.data.map(character => (
          <li className="col-12 " key={character.id}>
            <div>
              <div className=" p-2 m-2 bg-white rounded row">
                <div className="col-5 ">
                  <h2>
                    {character.nombre} {character.apellido}
                  </h2>
                  {character.status === 1 ? (
                    <span class="badge badge-pill badge-info">Activo</span>
                  ) : (
                    <span class="badge badge-pill badge-danger">Inactivo</span>
                  )}

                  <p>Telefono : {character.telefono}</p>
                </div>
                <div className="col">
                  <button
                    onClick={this.activar.bind(this, character.id)}
                    class="btn btn-primary btn-lg"
                  >
                    Activar / Desactivar
                  </button>
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
