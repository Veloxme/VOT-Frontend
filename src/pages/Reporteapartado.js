import React from "react";
export default class Reporteapartado extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      data: [],
      search: null
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/reporte/apartados");
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

  render() {
    if (this.state.error) {
      return <p className="text-center text-white">error...</p>;
    }
    return (
      <React.Fragment>
        <h1 className="text-white text-center">Reporte de Apartados</h1>
        <ul className="row">
          {this.state.data.map(character => (
            <li className="col-12 " key={character.id_venta}>
              <div>
                <div className=" p-2 m-2 bg-white rounded row">
                  <div className="col-5 ">
                    <h2>{character.producto}</h2>
                    <p>Enganche : {character.enganche}</p>
                    <p>
                      Cliente : {character.nombre} {character.apellido}
                    </p>
                    <p>
                      Telefono : {character.telefono} &nbsp;&nbsp; Direccion :{" "}
                      {character.direccion}
                    </p>
                    <p>Apartado el {character.fecha.split("T", 1)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}

          {this.state.loading && (
            <p className="text-center text-white">Loading...</p>
          )}
        </ul>
      </React.Fragment>
    );
  }
}
