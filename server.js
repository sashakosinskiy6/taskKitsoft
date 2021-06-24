const http = require('http');
const app = require('./api/app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})

