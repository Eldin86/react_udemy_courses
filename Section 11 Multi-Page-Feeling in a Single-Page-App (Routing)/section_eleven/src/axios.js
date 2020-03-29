import axios from 'axios'

//Kreiramo instancu axiosa, odnosno kopiju
//Mozemo u isto vrijeme da koristimo instancu i "original" (index.js)
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
//Takodjer mozmeo i na instanci da koristimo interceptorse kao i na defaultnom axiosu
//instance.interceptors.request.eject()

export default instance