import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  // Función para eliminar el favorito
  const handleRemoveFavorite = (favoriteId) => {
    actions.removeFavorite(favoriteId); // Elimina el favorito
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">
          <img
            src="https://cdn.worldvectorlogo.com/logos/star-wars.svg"
            alt="Star Wars"
            style={{ width: "80px", height: "auto" }}
          />
        </span>
      </Link>

      <div className="btn-group dropstart">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ marginRight: "20px" }} // Asegura que el botón no se desplace demasiado
        >
          Favorites ({store.favorites.length}) {/* Muestra el número de favoritos */}
        </button>

        <ul className="dropdown-menu" style={{ minWidth: "200px" }}>
          {store.favorites.length > 0 ? (
            store.favorites.map((favorite, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center">
                <Link
                  to={`/detailedView/${favorite.type}/${favorite.id}`} // Redirige con el tipo y el id
                  className="dropdown-item"
                >
                  {favorite.name || favorite.title || "Unnamed"}
                </Link>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => handleRemoveFavorite(favorite.id)} // Elimina el favorito al hacer clic
                >
                  <i className="fas fa-trash"></i> {/* Icono de cubo de basura */}
                </button>
              </li>
            ))
          ) : (
            <li>
              <a className="dropdown-item" href="#">
                No favorites
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
