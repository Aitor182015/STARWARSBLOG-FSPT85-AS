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
        <ul className="dropdown-menu" style={{ minWidth: "250px" }}>
          {store.favorites.length > 0 ? (
            store.favorites.map((favorite, index) => {
              const {
                id = `unknown-${index}`,
                name = "Unknown",
                image = "https://via.placeholder.com/150",
                type = "unknown",
              } = favorite;

              // Extraer el ID real sin el prefijo de tipo
              const [, realId] = id.split("-");

              const linkTo = `/detailedView/${type}/${realId}?image=${encodeURIComponent(image || "https://via.placeholder.com/150")}`;

              return (
                <li
                  key={id}
                  className="d-flex justify-content-between align-items-center py-2 px-2"
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <Link
                    to={linkTo}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <img
                      src={image}
                      alt={name}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <span>{name}</span>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveFavorite(id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })
          ) : (
            <li className="dropdown-item text-center">No favorites yet</li>
          )}
        </ul>
      </div>
    </nav>
  );
};
