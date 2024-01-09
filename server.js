import Express from 'express';
import bodyParser from 'body-parser';
import useDatabase from './services/database.js';
import * as dotenv from 'dotenv';
import useRoutes from './routers/index.js'
import cors from 'cors'
dotenv.config(); // Loads environment variables from .env file


useDatabase();

const app = new Express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware để đảm bảo kết nối MySQL đã được thiết lập trước khi xử lý yêu cầu

useRoutes(app);

app.listen(process.env.PORT || 8000, (error) => {
  if (!error) {
    console.log(
      `> Pet Protection is running on Port:${process.env.PORT}! Build something amazing!`
    );
  }
});