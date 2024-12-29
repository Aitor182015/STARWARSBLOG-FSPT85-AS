import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

// Definir imágenes de vehículos y planetas
const vehicleImages = {
  "4": "https://www.komar.de/media/catalog/product/cache/13/image/9df78eab33525d08d6e5fb8d27136e95/D/X/DX10-061_1570026662_3.jpg",
  "7": "https://static.wikia.nocookie.net/starwars/images/7/7b/MarkIIMediumBlaster-SWL36.jpg/revision/latest?cb=20220102162324",
  "6": "https://static.wikia.nocookie.net/starwars/images/f/f2/T-16_skyhopper_-_SW_20.png/revision/latest?cb=20160805002611",
  "8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGU4e7lVRRlgjSYAkwXm08GvPdzTj1u4LNSA&s",
  "14": "https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/07/12/460061/169256/rebel_snowspeeder_star_wars_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1867367.jpg",
  "18": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1PlyXjdUF3fUuWFNyNBrHJL2nqCEm9EgNSA&s",
  "16": "https://static.wikia.nocookie.net/esstarwars/images/1/17/TIE_Bomber_BF2.png/revision/latest/scale-to-width-down/1200?cb=20171101030957",
  "19": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb-7EJD-Pb93PRcJFP6QpAnuHoWS0NOe-K7Q&s",
  "20": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLUczB66TfmNbXxVH9nJ4WNj35MJbZUwS1A&s",
  "24": "https://www.brickfanatics.com/wp-content/uploads/2023/03/Star-Wars-Return-of-the-Jedi-Jabbas-Sail-Barge-800x445.jpg",
};

const planetImages = {
  "1": "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357",
  "2": "https://static.wikia.nocookie.net/esstarwars/images/4/4a/Alderaan.jpg/revision/latest/thumbnail/width/360/height/360?cb=20100723184830",
  "3": "https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729",
  "4": "https://static.wikia.nocookie.net/esstarwars/images/1/1d/Hoth_SWCT.png/revision/latest?cb=20170802030704",
  "5": "https://static.wikia.nocookie.net/esstarwars/images/1/1c/Dagobah.jpg/revision/latest?cb=20061117132132",
  "6": "https://static.wikia.nocookie.net/esstarwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170527220537",
  "7": "https://static.wikia.nocookie.net/esstarwars/images/5/50/Endor_FFGRebellion.png/revision/latest?cb=20170629163352",
  "8": "https://static.wikia.nocookie.net/esstarwars/images/f/f0/Naboo_planet.png/revision/latest?cb=20190928214307",
  "9": "https://static.wikia.nocookie.net/esstarwars/images/1/16/Coruscant-EotE.jpg/revision/latest/scale-to-width-down/1200?cb=20221030195452",
  "10": "https://static.wikia.nocookie.net/esstarwars/images/a/a9/Eaw_Kamino.jpg/revision/latest?cb=20210616005549",
};

export const Home = () => {
  const { actions, store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await actions.getCharacters();
      await actions.getPlanets();
      await actions.getVehicles();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFavorite = (item, type) => {
    let image = "";
    let id = "";

    console.log("Item:", item); // Ver cómo es el objeto que estamos recibiendo
    console.log("Type:", type); // Verificar el tipo que estamos pasando

    if (type === "planet") {
      // Si el item tiene una url, extraemos el id con una expresión regular
      if (item.url) {
        const match = item.url.match(/\/(\d+)\//);
        if (match) {
          id = match[1]; // Extraemos el número como id
        }
      }
      // Asignar la imagen de acuerdo al id
      image = planetImages[id] || "https://via.placeholder.com/150";
    } else if (type === "vehicle") {
      id = item.uid || "unknown";
      image = vehicleImages[id] || "https://via.placeholder.com/150";
    } else if (type === "character") {
      image = item.image || "https://via.placeholder.com/150";
      id = item.uid || item.index || "unknown";
    }

    // For the favorite button, set ID to -1 for the image
    if (id === "unknown") {
      id = "-1";
    }

    console.log("Final ID:", id);

    const favorite = {
      id: id,
      name: item.name || item.details?.name,
      type: type,
      image: image,
    };

    actions.addFavorite(favorite);
    console.log("Favorite added:", favorite);
  };

  return (
    <div className="mt-5">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <h1>Characters</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.characters?.length > 0 ? (
              store.characters.map((character, index) => (
                <div key={index} className="card" style={{ width: "18rem", flexShrink: 0 }}>
                  <img
                    src={character.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={character.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <p className="card-text">Gender: {character.gender}</p>
                    <p className="card-text">Hair color: {character.hairColor}</p>
                    <p className="card-text">Eye color: {character.eyeColor}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/detailedView/character/${index}?image=${encodeURIComponent(character.image || "https://via.placeholder.com/150")}`}
                        className="btn btn-primary"
                      >
                        Learn More
                      </Link>
                      <button className="btn btn-light" onClick={() => handleFavorite(character, "character")}>
                        <i className="fas fa-heart text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No characters available</p>
            )}
          </div>

          <h1>Planets</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.planets?.length > 0 ? (
              store.planets.map((planet, index) => (
                <div key={index} className="card" style={{ width: "18rem", flexShrink: 0 }}>
                  <img
                    src={planetImages[index+1] || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={planet.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{planet.name}</h5>
                    <p className="card-text">Population: {planet.population}</p>
                    <p className="card-text">Terrain: {planet.terrain}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/detailedView/planet/${planet.url.match(/\/(\d+)\//)[1]}?image=${encodeURIComponent(planetImages[planet.url.match(/\/(\d+)\//)[1]] || "https://via.placeholder.com/150")}`}
                        className="btn btn-primary"
                      >
                        Learn More
                      </Link>
                      <button className="btn btn-light" onClick={() => handleFavorite(planet, "planet")}>
                        <i className="fas fa-heart text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No planets available</p>
            )}
          </div>

          <h1>Vehicles</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.vehicles?.length > 0 ? (
              store.vehicles.map((vehicle, index) => (
                <div key={index} className="card" style={{ width: "18rem", flexShrink: 0 }}>
                  <img
                    src={vehicleImages[vehicle.uid] || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={vehicle.name || "Unknown Vehicle"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{vehicle.details.name}</h5>
                    <p className="card-text">Model: {vehicle.details.model}</p>
                    <p className="card-text">Cargo Capacity: {vehicle.details.cargo_capacity}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/detailedView/vehicle/${vehicle.uid || index + 1}?image=${encodeURIComponent(vehicleImages[vehicle.uid] || "https://via.placeholder.com/150")}`}
                        className="btn btn-primary"
                      >
                        Learn More
                      </Link>
                      <button className="btn btn-light" onClick={() => handleFavorite(vehicle, "vehicle")}>
                        <i className="fas fa-heart text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No vehicles available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
