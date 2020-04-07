import axios from 'axios';

export default axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: {
    key: 'AIzaSyBCfKGKzJHfDDDkBbwi6wX2zu8ZN7QKM9w',
  },
});
