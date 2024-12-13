const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            characters: [] 
        },
		actions: {
			getCharacters: async () => {
                try {
                    let response = await fetch("https://www.swapi.tech/api/people/1", {
                        method: "GET",
                    });
                    if (!response.ok) return;
                    let data = await response.json();
                    setStore({ characters: data.characterss });
                } catch (error) {
                    console.log("Error al obtener personajes:", error);
                }
            },
			},
		}
	};

export default getState;
