import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const handleRemoveFavorite = (favoriteId) => {
    actions.removeFavorite(favoriteId);
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
        >
          Favorites ({store.favorites.length})
        </button>
        <ul className="dropdown-menu" style={{ minWidth: "200px" }}>
          {store.favorites.length > 0 ? (
            store.favorites.map((favorite, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center">
                <Link
                  to={`/detailedView/${favorite.type}/${favorite.id}?image=${encodeURIComponent(favorite.image)}`}
                  className="dropdown-item"
                >
                  {favorite.name || "Unknown"}
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))
          ) : (
            <li className="dropdown-item">No favorites yet</li>
          )}
        </ul>
      </div>
    </nav>
  );
};
