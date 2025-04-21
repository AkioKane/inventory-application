const { Router } = require("express");
const { indexRouterGet, sellRouterPost } = require("../controllers/indexController");

const indexRouter = Router()

indexRouter.get("/", indexRouterGet);
indexRouter.post("/sell", sellRouterPost);

module.exports = indexRouter;