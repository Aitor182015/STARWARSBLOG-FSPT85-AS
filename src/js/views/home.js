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

  const handleFavorite = (item, type, index) => {
    let image = "";
    let id = "";

    if (type === "planet") {
      const match = item.url?.match(/\/(\d+)\//);
      id = match ? match[1] : index + 1;
      image = planetImages[id] || "https://via.placeholder.com/150";
    } else if (type === "vehicle") {
      id = item.uid || index + 1;
      image = vehicleImages[id] || "https://via.placeholder.com/150";
    } else if (type === "character") {
      id = item.uid || item.id - 1 || index;
      image = item.image || "https://via.placeholder.com/150";
    }

    if (id === undefined || id === null || id === "unknown") {
      console.error("Invalid ID:", id);
      return;
    }

    const uniqueId = `${type}-${id}`;

    const existingFavorite = store.favorites.find((fav) => fav.id === uniqueId);
    if (existingFavorite) {
      console.log("This item is already in favorites");
      return;
    }

    const favorite = {
      id: uniqueId,
      name: item.name || item.details?.name,
      type: type,
      image: image,
    };

    actions.addFavorite(favorite);
  };

  return (
    <div className="mt-5">
      {loading ? (
        <p className="text-danger">Loading data...</p>
      ) : (
        <>
          <h1 className="text-danger">Characters</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.characters?.map((character, index) => (
              <div
                key={character.uid || index}
                className="card bg-black text-danger border border-3 border-danger m-2"
                style={{ width: "18rem", flexShrink: 0 }}
              >
                <img
                  src={character.image || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={character.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text">Gender: {character.gender}</p>
                  <p className="card-text">Mass: {character.mass}</p>
                  <p className="card-text">Height: {character.height}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/detailedView/character/${character.uid || index}?image=${encodeURIComponent(
                        character.image || "https://via.placeholder.com/150"
                      )}`}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                    <button
                      className="btn btn-light"
                      onClick={() => handleFavorite(character, "character", index)}
                    >
                      {store.favorites.some((fav) => fav.id === `character-${character.uid || index}`) ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-heart text-danger"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-danger">Planets</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.planets?.map((planet, index) => (
              <div
                key={planet.url.match(/\/(\d+)\//)?.[1] || index}
                className="card bg-black text-danger border border-3 border-danger m-2"
                style={{ width: "18rem", flexShrink: 0 }}
              >
                <img
                  src={planetImages[planet.url.match(/\/(\d+)\//)?.[1]] || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={planet.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{planet.name}</h5>
                  <p className="card-text">Population: {planet.population}</p>
                  <p className="card-text">Terrain: {planet.terrain}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/detailedView/planet/${planet.url.match(/\/(\d+)\//)?.[1]}?image=${encodeURIComponent(
                        planetImages[planet.url.match(/\/(\d+)\//)?.[1]] || "https://via.placeholder.com/150"
                      )}`}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                    <button
                      className="btn btn-light"
                      onClick={() => handleFavorite(planet, "planet", index)}
                    >
                      {store.favorites.some(
                        (fav) => fav.id === `planet-${planet.url.match(/\/(\d+)\//)?.[1]}`
                      ) ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-heart text-danger"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-danger">Vehicles</h1>
          <div className="d-flex overflow-auto gap-3 mb-5">
            {store.vehicles?.map((vehicle, index) => (
              <div key={vehicle.uid || index} className="card bg-black text-danger border border-3 border-danger m-2" style={{ width: "18rem", flexShrink: 0 }}>
                <img
                  src={vehicleImages[vehicle.uid] || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={vehicle.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{vehicle.details.name}</h5>
                  <p className="card-text">Model: {vehicle.details.model}</p>
                  <p className="card-text">Passengers: {vehicle.details.passengers}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/detailedView/vehicle/${vehicle.uid}?image=${encodeURIComponent(
                        vehicleImages[vehicle.uid] || "https://via.placeholder.com/150"
                      )}`}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                    <button
                      className="btn btn-light"
                      onClick={() => handleFavorite(vehicle, "vehicle", index)}
                    >
                      {store.favorites.some((fav) => fav.id === `vehicle-${vehicle.uid}`) ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-heart text-danger"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
