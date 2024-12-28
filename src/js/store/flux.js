const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            vehicles: [],
            favorites: [], // Lista de favoritos
        },
        actions: {
            // Obtener personajes
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
                    setStore({ characters: data });
                } catch (error) {
                    console.log("Error al obtener personajes:", error);
                }
            },

            // Obtener planetas
            getPlanets: async () => {
                try {
                    let response = await fetch('https://swapi.py4e.com/api/planets/');
                    if (response.ok) {
                        let data = await response.json();
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.log('Error fetching planets:', error);
                }
            },

            // Obtener vehículos
            getVehicles: async () => {
                try {
                    let response = await fetch('https://www.swapi.tech/api/vehicles/');
                    if (response.ok) {
                        let data = await response.json();
                        const vehiclesWithDetails = await Promise.all(
                            data.results.map(async (vehicle) => {
                                let detailsResponse = await fetch(vehicle.url);
                                if (detailsResponse.ok) {
                                    let detailsData = await detailsResponse.json();
                                    return {
                                        ...vehicle,
                                        details: detailsData.result.properties
                                    };
                                }
                                return vehicle;
                            })
                        );
                        setStore({ vehicles: vehiclesWithDetails });
                    }
                } catch (error) {
                    console.log('Error fetching vehicles:', error);
                    setStore({ vehicles: [] });
                }
            },

            // Agregar un elemento a favoritos
            addFavorite: (item, type) => {
                const store = getStore();
                // Evitar duplicados al agregar a favoritos
                if (!store.favorites.some(fav => fav.id === item.id)) {
                    setStore({ favorites: [...store.favorites, { ...item, type }] }); // Guarda el tipo también
                }
            },

            // Eliminar un favorito
            removeFavorite: (id) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter(fav => fav.id !== id) });
            },
        },
    };
};

export default getState;
