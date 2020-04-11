import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-projekat-ii.firebaseio.com/'
})

export default instance