const express = require('express')
const logger = require('./middleware/logger');
const app = express();
const cors = require('cors');
const port = 3000;
const messagesRouter = require('./routes/v1/messages');

app.use(cors());//cors niet kunnen niet
app.use("/api/v1/messages/", messagesRouter);//word alleen op /api/v1/messages gebruikt, maakt niet echt uit wat er staat kan ook Seren staan ofzo
app.use(express.json());//word op alles gebruikt. gebruikt om tussen backend en frontend te praten in Json en gaat json zo activeren. op elke route moet json werken


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})