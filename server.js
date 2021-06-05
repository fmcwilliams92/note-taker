// adding in the express library
const express = require('express');
// calling the express library
const app = express();

const port = process.env.PORT || 3001;
app.use(express.json());