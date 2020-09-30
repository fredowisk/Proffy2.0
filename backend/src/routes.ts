import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";

//modulo de roteamento do express
const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

//classes
routes.get("/classes", classesControllers.index);
routes.post("/classes", classesControllers.create);

//connections
routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

export default routes;
