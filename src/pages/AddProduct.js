import React from "react";
const Swal = require("sweetalert2");
const Axios = require("axios");

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      descripcion: "",
      plataforma: "",
      precio: "",
      id_proveedor: "",
      cantidad: "",
      imagen: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submitted");
    console.log(this.state);
    let fd = new FormData();
    fd.append("imagen", this.state.imagen);
    fd.append("nombre", this.state.nombre);
    fd.append("descripcion", this.state.descripcion);
    fd.append("plataforma", this.state.plataforma);
    fd.append("telefono", this.state.id_proveedor);
    fd.append("cantidad", this.state.cantidad);
    fd.append("precio", this.state.precio);
    console.log("fb", fd);
    Axios.post("http://localhost:4000/add", fd).then(res => {
      console.log(res);
      this.setState({ data: [] });
      Swal.fire("Hecho!", "Producto agregado", "success");
      document.getElementById("inputGroupFile01").value = "";
      document.getElementById("descripcion").value = "";

      document.getElementById("nombre").value = "";
      document.getElementById("plataforma").value = "";
      document.getElementById("cantidad").value = "";
      document.getElementById("precio").value = "";
      document.getElementById("id_proveedor").value = "";
    });
  };

  fileSelectedHandler = e => {
    this.setState({ imagen: e.target.files[0] });
  };

  handleClick = e => {
    console.log("Button was clicked");
  };

  render() {
    return (
      <div className="container">
        <div class="row">
          <h1 className="text-white mx-auto mb-4">Agregar</h1>
          <div class="col-12">
            <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    class="form-control"
                    placeholder="nombre"
                    onChange={this.changeHandler}
                    autofocus
                  />
                </div>
                <div class="input-group col-md-6">
                  <div class="custom-file">
                    <input
                      type="file"
                      name="image"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      onChange={this.fileSelectedHandler}
                    />
                    <label class="custom-file-label" for="inputGroupFile01">
                      Selecciona imagen
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <textarea
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  class="form-control"
                  placeholder="descripcion"
                  onChange={this.changeHandler}
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    id="plataforma"
                    name="plataforma"
                    class="form-control"
                    placeholder="plataforma"
                    onChange={this.changeHandler}
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    id="id_proveedor"
                    name="id_proveedor"
                    class="form-control"
                    placeholder="Telefono del proveedor"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    id="precio"
                    name="precio"
                    class="form-control"
                    placeholder="precio"
                    onChange={this.changeHandler}
                  />
                </div>

                <div class="form-group col-md-6">
                  <input
                    type="text"
                    id="cantidad"
                    name="cantidad"
                    class="form-control"
                    placeholder="cantidad"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <button class="btn btn-primary " onClick={this.handleClick}>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
