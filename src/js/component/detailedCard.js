import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const DetailedCard = ({ data, type }) => {
  const { actions, store } = useContext(Context);

  // Llamada inicial a la acción para obtener personajes, planetas y vehículos
  useEffect(() => {
    actions.getCharacters();
    actions.getPlanets();
    actions.getVehicles();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-4 text-center">
            <img
              src={data.image}
              alt={data.name || data.title || "Unknown"}
              className="img-fluid p-3"
            />
          </div>
          <div className="col-md-8 p-4">
            <h2 className="mb-3">{data.name || data.title || "Unknown"}</h2>
            <p className="text-muted">
              {data.wiki || "No description available"}
            </p>
            <button className="btn btn-primary float-end">
              Favorites <span className="badge bg-secondary">0</span>
            </button>
          </div>
        </div>
        <hr />
        <div className="row text-center text-danger mt-3">
          {type === "character" && (
            <>
              <div className="col">
                <p><strong>Birth Year</strong></p>
                <p>{data.born || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Gender</strong></p>
                <p>{data.gender || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Height</strong></p>
                <p>{data.height || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Skin Color</strong></p>
                <p>{data.skinColor || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Eye Color</strong></p>
                <p>{data.eyeColor || "Unknown"}</p>
              </div>
            </>
          )}
          {type === "planet" && (
            <>
              <div className="col">
                <p><strong>Climate</strong></p>
                <p>{data.climate || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Diameter</strong></p>
                <p>{data.diameter || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Population</strong></p>
                <p>{data.population || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Terrain</strong></p>
                <p>{data.terrain || "Unknown"}</p>
              </div>
            </>
          )}
          {type === "vehicle" && (
            <>
              <div className="col">
                <p><strong>Model</strong></p>
                <p>{data.model || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Cargo Capacity</strong></p>
                <p>{data.cargo_capacity || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Length</strong></p>
                <p>{data.length || "Unknown"}</p>
              </div>
              <div className="col">
                <p><strong>Passengers</strong></p>
                <p>{data.passengers || "Unknown"}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
