import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-application.firebaseio.com/'
});

export default instance;