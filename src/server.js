const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', async (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started \nListening on port:${PORT}`);
});
