const getState = ({ getStore, getActions, setStore }) => {
    const fetchData = async (url, setFetchingKey, storeKey, transformData = (data) => data) => {
      const store = getStore();
  
      if (store[storeKey].length > 0 || store[setFetchingKey]) {
        console.log(`Datos cargados en ${storeKey}`);
        return;
      }
  
      setStore({ [setFetchingKey]: true });
  
      try {
        console.log(`Fetching ${storeKey}...`);
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Error fetching ${storeKey}:`, response.status);
          return;
        }
        let data = await response.json();
        setStore({ [storeKey]: transformData(data) });
      } catch (error) {
        console.error(`Error fetching ${storeKey}:`, error);
      } finally {
        setStore({ [setFetchingKey]: false });
      }
    };
  
    return {
      store: {
        characters: [],
        planets: [],
        vehicles: [],
        favorites: [],
        isCharactersFetching: false,
        isPlanetsFetching: false,
        isVehiclesFetching: false,
      },
      actions: {
        // Obtener personajes
        getCharacters: () =>
          fetchData("https://akabab.github.io/starwars-api/api/all.json", "isCharactersFetching", "characters"),
  
        // Obtener planetas
        getPlanets: () =>
          fetchData("https://swapi.py4e.com/api/planets/", "isPlanetsFetching", "planets", (data) => data.results),
  
        // Obtener vehículos
        getVehicles: async () => {
          const store = getStore();
  
          if (store.vehicles.length > 0 || store.isVehiclesFetching) {
            console.log("Los vehículos ya están cargados o se está realizando la solicitud.");
            return;
          }
  
          setStore({ isVehiclesFetching: true });
  
          try {
            console.log("Fetching vehicles...");
            let response = await fetch("https://www.swapi.tech/api/vehicles/");
            if (!response.ok) {
              console.error("Error al obtener vehículos:", response.status);
              return;
            }
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
          } catch (error) {
            console.error("Error al obtener vehículos:", error);
          } finally {
            setStore({ isVehiclesFetching: false });
          }
        },
  
        // Agregar un elemento a favoritos
        addFavorite: (item) => {
          const store = getStore();
          const isDuplicate = store.favorites.some(
            (fav) => (fav.id && item.id ? fav.id === item.id : fav.uid === item.uid)
          );
  
          if (!isDuplicate) {
            setStore({ favorites: [...store.favorites, item] });
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
  