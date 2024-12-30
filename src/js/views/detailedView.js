import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DetailedCard from "../component/detailedCard";
import { Context } from "../store/appContext";


const DetailedView = () => {
  const { type, uid } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); 
  const { actions, store } = useContext(Context);
  const [data, setData] = useState(null);
  const image = new URLSearchParams(location.search).get("image");

  useEffect(() => {
    const fetchData = async () => {
      
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

          // Almacena los datos en localStorage de planetas
          localStorage.setItem(`${type}-${uid}`, JSON.stringify({ ...character, id: uid, type }));
        } else if (type === "planet") {
          console.log(`Fetching planet data for id: ${uid}`);
          response = await fetchWithRetry(`https://swapi.py4e.com/api/planets/${uid}/`);
          setData({ ...response, id: uid, type, image: "https://via.placeholder.com/150?text=Planet" }); // Imagen predeterminada para planetas

          // Almacena los datos en localStorage de vehiculos
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
  }, [uid, type]); 

  const handleFavorite = (item) => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('image');
    
    
    let image = imageUrl || "https://via.placeholder.com/150"; 
  
    
    const favoriteItem = {
      ...item,
      id: `${item.type}-${item.id}`,
      image: image, 
    };
  
    // Para asegurarse que el objeto tenga los campos 'id' y 'type' antes de agregarlo a favoritos
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
