const express = require('express')
const logger = require('./middleware/logger');
const app = express();
const cors = require('cors');
const port = 3000;

const config = require('config');
const mongoose = require('mongoose');
// Read DB URI from config, allow overriding with env var MONGO_URI
const dbUri = process.env.MONGO_URI || config.get('db.uri');
const dbOptions = config.has('db.options') ? config.get('db.options') : {};

// Connect to MongoDB before loading routes/models
mongoose.connect(dbUri, dbOptions)
  .then(() => console.log(`Connected to MongoDB at ${dbUri}`))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const messagesRouter = require('./routes/v1/messages');

app.use(cors()); // enable CORS
app.use(express.json()); // parse JSON bodies
app.use("/api/v1/messages/", messagesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})