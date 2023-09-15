
const express = require('express');
const app = express();
const port = 8000;
// TODO: add CORS to dependencies

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

// TODO: Add call to Routes here

app.listen(port, () => console.log(`Listening on port: ${port}`) );
