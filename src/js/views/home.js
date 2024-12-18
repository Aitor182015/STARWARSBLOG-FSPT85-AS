import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { actions, store } = useContext(Context);  // Accediendo al store y las actions
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await actions.getCharacters(); // Cargar personajes
            await actions.getPlanets(); // Cargar planetas
            await actions.getVehicles(); // Cargar vehículos
            setLoading(false); // Termina de cargar
        };

        fetchData();
    }, []);  // Este efecto se ejecuta una sola vez

    // Verificación en la consola de lo que está en el store
    console.log("Store Characters:", store.characters);
    console.log("Store Planets:", store.planets);
    console.log("Store Vehicles:", store.vehicles);

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
                                        <Link to={`/detailedView/character/${character.id}`} className="btn btn-primary">
                                            Learn More
                                        </Link>
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
                                        src={planet.image || "https://static.wikia.nocookie.net/starwars/images/7/72/Teth-TVE.png/revision/latest?cb=20190423045047"}
                                        className="card-img-top"
                                        alt={planet.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{planet.name}</h5>
                                        <p className="card-text">Population: {planet.population}</p>
                                        <p className="card-text">Terrain: {planet.terrain}</p>
                                        <Link to={`/detailedView/planet/${index + 1}`} className="btn btn-primary">
                                            Learn More
                                        </Link>
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
                                        src="https://www.syfy.com/sites/syfy/files/styles/scale_600/public/x-wing-t70-composite.jpg"
                                        className="card-img-top"
                                        alt={vehicle.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{vehicle.name}</h5>
                                        <p className="card-text">Model: {vehicle.model}</p>
                                        <p className="card-text">Passengers: {vehicle.passengers}</p>
                                        <Link to={`/detailedView/vehicle/${vehicle.uid}`} className="btn btn-primary">
                                            Learn More
                                        </Link>
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
