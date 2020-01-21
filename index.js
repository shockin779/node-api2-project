const express = require('express');
const postsRoutes = require('./posts/postsRoutes');
const server = express();
const port = 8000;

server.use(express.json())
server.use('/api/posts', postsRoutes);

server.use('/', (req, res) => {
    res.status(200).send("API is up and running");
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})