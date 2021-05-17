const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Started \nListening on port:${PORT}`);
});
