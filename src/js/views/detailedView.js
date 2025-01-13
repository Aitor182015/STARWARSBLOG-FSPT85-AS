import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../component/detailedCard";
import { Context } from "../store/appContext";

const DetailedView = () => {
  const { type, uid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [data, setData] = useState(null);
  const image = new URLSearchParams(location.search).get("image") || "https://via.placeholder.com/150";

  useEffect(() => {
    const fetchData = async () => {
      const localKey = `${type}-${uid}`;
      const cachedData = localStorage.getItem(localKey);

      if (cachedData) {
        console.log("Loading from localStorage...");
        setData(JSON.parse(cachedData));
        return;
      }

      try {
        let fetchedData;

        // Función genérica para manejar la carga de diferentes tipos
        const fetchByType = async () => {
          if (type === "character") {
            const allCharactersKey = "all-characters";
            let allCharacters = JSON.parse(localStorage.getItem(allCharactersKey));

            if (!allCharacters) {
              console.log("Fetching characters from API...");
              const response = await fetch("https://akabab.github.io/starwars-api/api/all.json");
              allCharacters = await response.json();
              localStorage.setItem(allCharactersKey, JSON.stringify(allCharacters));
            }

            return { ...allCharacters[parseInt(uid)], id: uid, type };
          }

          if (type === "planet") {
            const response = await fetch(`https://swapi.py4e.com/api/planets/${uid}/`);
            const planetData = await response.json();
            return { ...planetData, id: uid, type, image };
          }

          if (type === "vehicle") {
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}/`);
            const vehicleData = await response.json();
            return { ...vehicleData.result.properties, id: uid, type, image: vehicleData.result.properties.image || image };
          }

          console.error(`Unknown type: ${type}`);
        };

        fetchedData = await fetchByType();

        if (fetchedData) {
          localStorage.setItem(localKey, JSON.stringify(fetchedData));
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (type && uid) {
      fetchData();
    } else {
      console.error("Invalid type or uid.");
    }
  }, [uid, type]);

  const handleFavorite = (item) => {
    const favoriteItem = { ...item, id: `${item.type}-${item.id}`, image };
    if (favoriteItem.id && favoriteItem.type) {
      actions.addFavorite(favoriteItem);
      navigate(`/detailedView/${favoriteItem.type}/${favoriteItem.id.split("-")[1]}?image=${encodeURIComponent(image)}`);
    } else {
      console.error("Invalid favorite item:", favoriteItem);
    }
  };

  if (!data) {
    return <p>Loading details...</p>;
  }

  return (
    <div>
      <h1>Detailed View</h1>
      <DetailedCard data={data} type={type} image={image} onFavorite={() => handleFavorite(data)} />
    </div>
  );
};

export default DetailedView;
