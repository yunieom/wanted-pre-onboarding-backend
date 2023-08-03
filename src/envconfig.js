require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};
