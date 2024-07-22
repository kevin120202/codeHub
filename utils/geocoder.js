import node_geocoder from "node-geocoder";
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.GEOCODER_API_KEY);

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
}

const geocoder = node_geocoder(options)
export default geocoder