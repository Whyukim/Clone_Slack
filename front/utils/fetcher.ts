import axios from 'axios';

const fatcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

export default fatcher;
