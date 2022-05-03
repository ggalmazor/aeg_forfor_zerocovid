import http from 'http';
import express from 'express';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const http_server = http.createServer(app);

http_server.listen(port, () => {
  console.log(`Server activo en http://localhost:${port}`);
});



app.get(''
)
