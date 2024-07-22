import axios from 'axios';
import {API_Token, baseUrl} from '../util/Constants';

const config = {
  headers: {
    Accept: 'application/json',
    'content-Type': 'application/json',
    Authorization: `Bearer ${API_Token}`,
  },
};

const useApi = () => {
  const getMoviesList = async () => {
    try {
      const response = await axios.get(`${baseUrl}upcoming`, config);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getMovieDetails = async movie_id => {
    try {
      const response = await axios.get(`${baseUrl}${movie_id}`, config);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getMovieTrailers = async movie_id => {
    try {
      const response = await axios.get(`${baseUrl}${movie_id}/videos`, config);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  const searchMovies = async searchValue => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false`,
        config,
      );
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    getMoviesList,
    getMovieDetails,
    getMovieTrailers,
    searchMovies,
  };
};

export default useApi;
