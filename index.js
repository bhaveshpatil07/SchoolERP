import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { default as router } from "./api-routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import path, { dirname } from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
app.use(json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Welcome.html')); 
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { defaultExpanded: false }));
app.use("/api/v1", router);

mongoose.connect(process.env.MONGODB_URI)
    .then(() =>
        app.listen(process.env.PORT || 8000, () =>
            console.log(`Connected To Database And Server is running on port ${process.env.PORT || 8000}`)
        )
    )
    .catch((e) => console.log(e));

