import React from "react";
export default class Downemple extends React.Component {
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
      const response = await fetch("http://localhost:4000/showprovee");
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
      <ul className="row">
        {this.state.data.map(character => (
          <li className="col-12 " key={character.id}>
            <div>
              <div className=" p-2 m-2 bg-white rounded row">
                <div className="col-5 ">
                  <h2>
                    {character.nombre} {character.apellido}
                  </h2>
                  <p>Telefono : {character.telefono}</p>
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
