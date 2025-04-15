const { Router } = require("express");
const { sellRouterGet } = require("../controllers/sellController");

const sellRouter = Router()

sellRouter.get("/", sellRouterGet);

module.exports = sellRouter;