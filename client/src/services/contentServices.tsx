import axios from 'axios';


export const fetchJoke = async () => {
    try {
      const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?type=single`);
      console.log(response.data)
      const joke = response.data.joke
      return joke;
    } catch (error) {
      // Handle error (e.g., display an error message)
      throw error;
    }
  };