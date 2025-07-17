const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const discussionRoutes = require('./routes/discussions');
const commentRoutes = require('./routes/comments');

app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('API Diskusi Kelas berjalan dengan baik di port 3000!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
