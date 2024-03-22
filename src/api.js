import axios from 'axios';
export const characterData = async () => {
    let idAleatorio = Math.floor(Math.random() * 600) + 1;
    const URL = `https://rickandmortyapi.com/api/character/${idAleatorio}`;

    try {
        const response = await axios.get(URL)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}