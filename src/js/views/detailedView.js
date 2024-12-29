import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // Usamos navigate para redirigir
  const { actions, store } = useContext(Context); // Accede al store y acciones del contexto
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
          setData({ ...response, id: uid, type, image: "https://via.placeholder.com/150?text=Planet" }); // Imagen predeterminada para planetas

          // Almacena los datos en localStorage
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({ ...response, id: uid, type, image: "https://via.placeholder.com/150?text=Planet" }));
        } else if (type === "vehicle") {
          console.log(`Fetching vehicle data for id: ${uid}`);
          response = await fetchWithRetry(`https://www.swapi.tech/api/vehicles/${uid}/`);
          const vehicleData = response.result.properties; // Accedemos a la propiedad correcta para obtener los datos

          setData({
            ...vehicleData,
            id: uid,
            type,
            image: vehicleData.image || "https://via.placeholder.com/150?text=Vehicle", // Imagen predeterminada si no existe una
          });

          // Almacena los datos en localStorage
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({
            ...vehicleData,
            id: uid,
            type,
            image: vehicleData.image || "https://via.placeholder.com/150?text=Vehicle",
          }));
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
    // Obtener el parámetro de la imagen de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('image'); // Obtener el parámetro 'image' de la URL
    
    // Si no hay imagen en la URL, se puede poner una imagen por defecto
    let image = imageUrl || "https://via.placeholder.com/150"; 
  
    // Aseguramos que el item tenga un id en el formato correcto: type-id
    const favoriteItem = {
      ...item,
      id: `${item.type}-${item.id}`, // Generamos el ID en el formato 'type-id'
      image: image, // Mantén la imagen original del item o la de la URL
    };
  
    // Verificamos que el objeto tenga los campos 'id' y 'type' antes de agregarlo a favoritos
    if (!favoriteItem.id || !favoriteItem.type) {
      console.error("Item does not contain valid id or type", favoriteItem);
      return;
    }
  
    actions.addFavorite(favoriteItem); // Añadir a favoritos
    
    // Redirigimos a la misma vista detallada con la URL original + el parámetro de imagen
    navigate(`/detailedView/${favoriteItem.type}/${favoriteItem.id.split('-')[1]}?image=${encodeURIComponent(image)}`);
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
