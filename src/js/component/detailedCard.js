import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const DetailedCard = ({ data, type, image, onFavorite }) => {
  const { actions } = useContext(Context);

  useEffect(() => {
    if (type === "character") {
      actions.getCharacters();
    }
    if (type === "planet") {
      actions.getPlanets();
    }
    if (type === "vehicle") {
      actions.getVehicles(true);
    }
  }, [actions, type]);

  const renderDetails = () => {
    const detailsMap = {
      character: [
        { label: "Birth Year", value: data.born },
        { label: "Gender", value: data.gender },
        { label: "Height", value: data.height },
        { label: "Skin Color", value: data.skinColor },
        { label: "Eye Color", value: data.eyeColor },
      ],
      planet: [
        { label: "Climate", value: data.climate },
        { label: "Diameter", value: data.diameter },
        { label: "Population", value: data.population },
        { label: "Terrain", value: data.terrain },
      ],
      vehicle: [
        { label: "Model", value: data.model },
        { label: "Cargo Capacity", value: data.cargo_capacity },
        { label: "Length", value: data.length },
        { label: "Passengers", value: data.passengers },
      ],
    };

    return detailsMap[type]?.map((detail, index) => (
      <div key={index} className="col">
        <p><strong>{detail.label}</strong></p>
        <p>{detail.value || "Unknown"}</p>
      </div>
    ));
  };

  return (
    <div className="container mt-5">
      <div className="card bg-black text-danger shadow border border-danger">
        <div className="row g-0">
          <div className="col-md-4 text-center">
            <img
              src={image || "https://via.placeholder.com/800x600"}
              alt={data.name || data.title || "Unknown"}
              className="img-fluid p-3"
              style={{ maxHeight: "600px", width: "auto", height: "auto", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-8 p-4">
            <h2 className="mb-3">{data.name || data.title || "Unknown"}</h2>
            <p className="text-muted">{data.wiki || "No description available"}</p>
            <button className="btn btn-primary float-end" onClick={onFavorite}>
              Add to favorites <i className="fas fa-heart text-danger"></i>
            </button>
          </div>
        </div>
        <hr />
        <div className="row text-center text-danger mt-3">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
