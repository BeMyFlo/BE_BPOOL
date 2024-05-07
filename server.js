import Express from "express";
import bodyParser from "body-parser";
import useDatabase from "./services/database.js";
import * as dotenv from "dotenv";
import useRoutes from "./routers/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config(); 

useDatabase();

const app = new Express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useRoutes(app);

app.listen(process.env.PORT || 8000, (error) => {
  if (!error) {
    console.log(
      `> Bpool is running on Port:${process.env.PORT}!`
    );
  }
});
