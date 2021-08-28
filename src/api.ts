import axios from 'axios';

export function fetchImageList(apiKey: string, q: string) {
  return axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`).then(response => {
    if (response.status === 200) {
      return response.data;
    }

    throw new Error('http fail');
  });
}