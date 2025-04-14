import axios from 'axios';

const Http = axios.create({
    baseURL: 'https://yearning-heidie-ulrichmbouna-bced7ca5.koyeb.app', // Base URL de votre API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Http;