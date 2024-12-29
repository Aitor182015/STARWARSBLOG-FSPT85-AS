import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import DetailedCard from "../component/detailedCard";
import { Context } from "../store/appContext";

// Función para manejar reintentos en caso de error 429
const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
  let attempt = 0;
  let response;

  while (attempt < retries) {
    response = await fetch(url);

    if (response.status === 429) {
      // Si obtenemos un error 429, esperar antes de reintentar
      console.log("Too many requests. Retrying...");
      await new Promise(resolve => setTimeout(resolve, delay)); // Espera antes de reintentar
      attempt++;
    } else {
      break; // Si la solicitud fue exitosa o no es un error 429, salimos del ciclo
    }
  }

  return response.json();
};

const DetailedView = () => {
  const { type, uid } = useParams(); // Obtiene 'type' y 'uid' de la URL
  const location = useLocation();
  const { actions } = useContext(Context); // Accede a las acciones del contexto
  const [data, setData] = useState(null);
  const image = new URLSearchParams(location.search).get("image");

  // Depuración para asegurarse de que 'type' y 'uid' no cambian inesperadamente
  useEffect(() => {
    console.log("Rendering DetailedView with:", { type, uid });
  }, [type, uid]); // Este log se ejecutará solo cuando cambien 'type' o 'uid'

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching data for type: ${type} and id: ${uid}`);

      let cachedData = localStorage.getItem(`${type}-${uid}`); // Intenta obtener los datos del localStorage
      if (cachedData) {
        console.log("Cargando datos desde localStorage...");
        setData(JSON.parse(cachedData)); // Si los datos están en localStorage, usarlos
        return;
      }

      try {
        let response = null;

        if (type === "character") {
          const charactersResponse = await fetch("https://akabab.github.io/starwars-api/api/all.json");
          const charactersData = await charactersResponse.json();
          const character = charactersData[parseInt(uid)];
          setData({ ...character, id: uid, type });

          // Almacena los datos en localStorage
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({ ...character, id: uid, type }));
        } else if (type === "planet") {
          console.log(`Fetching planet data for id: ${uid}`);
          response = await fetchWithRetry(`https://swapi.py4e.com/api/planets/${uid}/`);
          setData({ ...response, id: uid, type });

          // Almacena los datos en localStorage
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({ ...response, id: uid, type }));
        } else if (type === "vehicle") {
          console.log(`Fetching vehicle data for id: ${uid}`);
          response = await fetchWithRetry(`https://www.swapi.tech/api/vehicles/${uid}/`);
          setData({ ...response.result.properties, id: uid, type });

          // Almacena los datos en localStorage
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({ ...response.result.properties, id: uid, type }));
        } else {
          console.error(`Unknown type: ${type}`);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (type && uid) {
      fetchData();
    } else {
      console.error("Invalid type or uid. No fetch performed.");
    }
  }, [uid, type]); // Dependencias: 'uid' y 'type'

  const handleFavorite = (item) => {
    const favorite = {
      id: item.id || item.uid, // Asegúrate de usar el id correcto (para personajes, planetas, vehículos)
      name: item.name || item.details?.name,
      type: type, // Tipo de elemento: "character", "planet", "vehicle"
      image: image || item.image || "https://via.placeholder.com/150", // Usa la imagen proporcionada o un valor por defecto
    };
    actions.addFavorite(favorite); // Añadir a favoritos
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
