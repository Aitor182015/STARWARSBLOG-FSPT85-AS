const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            vehicles: [],
        },
        actions: {
            getCharacters: async () => {
                try {
                    let response = await fetch("https://akabab.github.io/starwars-api/api/all.json", {
                        method: "GET",
                    });
                    if (!response.ok) {
                        console.log(response.status);
                        return;
                    }
                    let data = await response.json();
                    console.log('Characters loaded', data); // Para depuración
                    setStore({ characters: data }); // Usar `data` directamente
                } catch (error) {
                    console.log("Error al obtener personajes:", error);
                }
            },

            getPlanets: async () => {
                try {
                    let response = await fetch('https://swapi.py4e.com/api/planets/');
                    if (response.ok) {
                        let data = await response.json();
                        console.log('Planets loaded', data.results); // Para depuración
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.log('Error fetching planets:', error);
                }
            },
            getVehicles: async () => {
                try {
                    let response = await fetch('https://swapi.tech/api/vehicles/');
                    if (response.ok) {
                        let data = await response.json();
                        console.log('Vehicles loaded', data.results); // Para depuración
                        setStore({ vehicles: data.results });
                    }
                } catch (error) {
                    console.log('Error fetching vehicles:', error);
                }
            },

            getDetailedData: async (type, uid) => {
                try {
                    let response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`, {
                        method: "GET",
                    });
                    if (!response.ok) {
                        console.log(response.status);
                        return;
                    }
                    let data = await response.json();
                    return data.result.properties; // Para obtener la propiedad 'properties'
                } catch (error) {
                    console.log(`Error al obtener el detalle de ${type}:`, error);
                }
            },
        },
    };
};

export default getState;
