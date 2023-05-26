import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./router/auth.js";
import festaRouter from './router/c_festa.js';
import placeRouter from './router/c_place.js';
import { config } from "./config.js";
import { sequelize } from "./db/database.js"
// import mainController from "./controller/main.js"
import mainRouter from "./router/main.js"
import { EventEmitter } from 'events';
import { initSocket } from './connection/socket.js'

const bus = new EventEmitter();
bus.setMaxListeners(20);

const app = express();
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/auth", authRouter);
app.use('/mypage', authRouter)
app.use('/', mainRouter);
app.use('/festa', festaRouter);
app.use('/place', placeRouter);



app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

sequelize.sync().then(() => {
    console.log(`서버가 시작되었습니다: ${new Date()}`)
    const server = app.listen(config.host.port);
    initSocket(server);
});