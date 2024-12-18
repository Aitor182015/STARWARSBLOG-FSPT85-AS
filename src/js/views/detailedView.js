import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailedCard from "../component/detailedCard"; // Ajusta la ruta según la ubicación

const DetailedView = () => {
  const { type, uid } = useParams(); // Obtener 'type' y 'uid' de la URL
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;

        if (type === "character") {
          // El mismo proceso que antes para personajes
          const charactersResponse = await fetch("https://akabab.github.io/starwars-api/api/all.json");
          const charactersData = await charactersResponse.json();
          const character = charactersData[uid]; // Usamos el índice 'uid' como posición
          setData(character); // Asignamos los datos del personaje encontrado
        } else if (type === "planet") {
          // Usamos el 'uid' como el número de ID del planeta
          response = await fetch(`https://swapi.py4e.com/api/planets/${uid}/`);
        } else if (type === "vehicle") {
          response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`);
        }

        if (response && !response.ok) {
          console.log("Error al obtener datos");
          return;
        }

        const result = await response.json();

        if (type === "planet") {
          setData(result); // Asignamos los datos del planeta
        } else if (response) {
          setData(result.result.properties); // Para vehículos
        }
      } catch (error) {
        console.log("Error al obtener detalles:", error);
      }
    };

    fetchData();
  }, [uid, type]);

  if (!data) {
    return <p>Loading details...</p>;
  }

  return (
    <div>
      <h1>Detailed View</h1>
      <DetailedCard data={data} type={type} /> {/* Pasar los datos y el tipo */}
    </div>
  );
};

export default DetailedView;
