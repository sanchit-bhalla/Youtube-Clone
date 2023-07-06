import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "40",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url, controllerSignal) => {
  try {
    options.signal = controllerSignal;

    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
  } catch (error) {
    // If we abort the request it means some other request is running. So do not throw Error bcz that will be caught in catch
    if (error.name === "CanceledError") return error;

    console.error("ERROR IN GETTING DATA: ", error);
    throw new Error(error);
  }
};
