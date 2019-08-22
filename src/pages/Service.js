import React from "react";
import { Link } from "react-router-dom";
import "./style/Badges.css";
import tienda from "../img/carrito.jpg";
import compras from "../img/compras.jpg";
import libreria from "../img/libreria.jpg";

class Service extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="text-white d-flex justify-content-center">Servicios</h1>
        <div className="container mt-3">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ul className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={tienda} alt="First slide" />
                <div className="carousel-caption d-none d-md-block">
                  <h1
                    className="btn btn-primary btn-lg "
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Tienda en linea
                  </h1>
                  <div className="collapse" id="collapseExample">
                    <div className="card card-body text-secondary">
                      ¡Compra en Gameplanet desde la comodidad de tu dispositivo
                      móvil! Enviamos a toda la república mexicana con un costo
                      de envio de $99 pesos. O aparta productos en preventa
                      desde tu smartphone, tablet o computadora. A la hora que
                      sea en donde quieras.
                      <Link
                        type="button"
                        className="btn btn-outline-info mt-2"
                        to="/Store"
                      >
                        Ir
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={compras}
                  alt="Second slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1
                    className="btn btn-primary btn-lg "
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample2"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Preventas
                  </h1>
                  <div className="collapse" id="collapseExample2">
                    <div className="card card-body text-secondary">
                      Los videojuegos más esperados y las ediciones de colección
                      más exclusivas se terminan rápido. ¡No te quedes sin la
                      tuya! Con nuestro sistema de preventas puedes apartar un
                      producto y segurar su disponibilidad para el lanzamiento.
                      Puedes hacer preventas desde nuestro sitio web y decidir
                      en qué sucursal quieres recogerlo. O puedes hacer una
                      preventa desde nuestra página y pedir que la enviemos a tu
                      domicilio cuando esté disponible.
                      <button
                        type="button"
                        className="btn btn-outline-info mt-2"
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={libreria}
                  alt="Third slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1
                    className="btn btn-primary btn-lg "
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample3"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Consulta Disponibilidad y Precios en Tiempo Real
                  </h1>
                  <div className="collapse" id="collapseExample3">
                    <div className="card card-body text-secondary">
                      ¿Buscas algún videojuego o producto en específico?
                      ¡Utiliza nuestro buscador! Mostramos en nuestro sitio web
                      el 100% del inventario en nuestras sucursales. Consulta la
                      disponibilidad por tienda así como los precios en tiempo
                      real. Nuestro sitio está diseñado para ser leído en
                      computadoras, tablets y dispositivos móviles gracias a su
                      diseño responsivo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Service;
