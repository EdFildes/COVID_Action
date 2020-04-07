import axios from 'axios';

export default axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: 'AIzaSyD8-9gu-sWnwYIEhRNu7f-AwBRbpgLYvVE',
    },
})