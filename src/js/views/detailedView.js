import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import DetailedCard from "../component/detailedCard";
import { Context } from "../store/appContext";

const DetailedView = () => {
  const { type, uid } = useParams(); // Obtiene 'type' y 'uid' de la URL
  const location = useLocation();
  const { actions } = useContext(Context); // Accede a las acciones del contexto
  const [data, setData] = useState(null);
  const image = new URLSearchParams(location.search).get("image");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;

        if (type === "character") {
          const charactersResponse = await fetch("https://akabab.github.io/starwars-api/api/all.json");
          const charactersData = await charactersResponse.json();
          const character = charactersData[parseInt(uid)];
          setData(character);
        } else if (type === "planet") {
          response = await fetch(`https://swapi.py4e.com/api/planets/${uid}/`);
        } else if (type === "vehicle") {
          response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}/`);
        }

        if (response && !response.ok) {
          console.log("Error al obtener datos");
          return;
        }

        const result = response ? await response.json() : null;

        if (type === "planet") {
          setData(result);
        } else if (type === "vehicle" && result) {
          setData(result.result.properties);
        }
      } catch (error) {
        console.log("Error al obtener detalles:", error);
      }
    };

    fetchData();
  }, [uid, type]); // Dependencias: 'uid' y 'type'

  const handleFavorite = (item) => {
    actions.addFavorite(item); // Añadir a favoritos
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
