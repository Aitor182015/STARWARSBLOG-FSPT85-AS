const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            planets: [],
            vehicles: [],
            favorites: [],
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
                    let response = await fetch("https://swapi.py4e.com/api/planets/");
                    if (response.ok) {
                        let data = await response.json();
                        setStore({ planets: data.results });
                    }
                } catch (error) {
                    console.log("Error fetching planets:", error);
                }
            },

            // Obtener vehículos
            getVehicles: async (force = false) => {
                const store = getStore();
                if (!force && store.vehicles.length > 0) return;

                try {
                    let response = await fetch("https://www.swapi.tech/api/vehicles/");
                    if (response.ok) {
                        let data = await response.json();
                        const vehiclesWithDetails = await Promise.all(
                            data.results.map(async (vehicle) => {
                                let detailsResponse = await fetch(vehicle.url);
                                if (detailsResponse.ok) {
                                    let detailsData = await detailsResponse.json();
                                    return {
                                        ...vehicle,
                                        details: detailsData.result.properties,
                                    };
                                }
                                return vehicle;
                            })
                        );
                        setStore({ vehicles: vehiclesWithDetails });
                    }
                } catch (error) {
                    console.log("Error fetching vehicles:", error);
                    setStore({ vehicles: [] });
                }
            },

            // Agregar un elemento a favoritos
            addFavorite: (item) => {
                const store = getStore();

                // Comparación más robusta para evitar duplicados
                const isDuplicate = store.favorites.some((fav) => {
                    if (fav.id && item.id) {
                        return fav.id === item.id; 
                    } else if (fav.uid && item.uid) {
                        return fav.uid === item.uid;  
                    }
                    return false;
                });

                if (!isDuplicate) {
                    // Agregar el nuevo favorito
                    setStore({
                        favorites: [...store.favorites, item],
                    });
                    console.log("Favorite added:", item); 
                } else {
                    console.log("Item already in favorites:", item); 
                }
            },

            // Eliminar un favorito
            removeFavorite: (id) => {
                const store = getStore();
                setStore({
                    favorites: store.favorites.filter((fav) => fav.id !== id && fav.uid !== id),
                });
            },
        },
    };
};

export default getState;
