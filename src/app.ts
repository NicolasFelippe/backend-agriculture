
import express, { Application } from 'express';
import ruralProducerRouter from './routes/RuralProducerRoutes'


const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(ruralProducerRouter)


app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});