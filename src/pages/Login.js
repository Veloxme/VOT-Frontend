import React, { Component } from "react";
const Swal = require("sweetalert2");
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  signIn = async e => {
    e.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        user: this.state.user,
        password: this.state.password
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    try {
      const response = await fetch("http://localhost:4000/login", requestInfo);
      const token = await response.json();
      if (token.message) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Ah ocurrido un error!"
        });
      } else {
        console.log(token);
        localStorage.setItem("token", token);
        Swal.fire("Bienvenido!", "Inicio de sesion exitoso", "success");
        this.props.history.push("/Admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="text-white mx-auto mb-4">LogIn</h1>
          <div className="col-12">
            <div className="col-md-4 offset-4">
              <form onSubmit={this.signIn}>
                <div class="form-group">
                  <label className="text-white">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    name="user"
                    onChange={this.changeHandler}
                  />
                </div>
                <div class="form-group">
                  <label className="text-white">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </div>
                <button class="btn btn-primary">Iniciar sesion</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
