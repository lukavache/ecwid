import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import errorMiddleware from "./middleware/error-middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorMiddleware);

(() => {
    try {
        app.listen(port, () => console.log(`App listening on port ${port}!`));
    } catch (error) {
        console.error('Something went wrong:', error);
    }
})();