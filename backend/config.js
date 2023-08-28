require('dotenv').config();
console.log(process.env) 
const apiConfig = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    openApiKey: process.env.OPENAI_API_KEY,
};

module.exports = apiConfig;