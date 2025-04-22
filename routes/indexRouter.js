const { Router } = require("express");
const { indexRouterGet, sellRouterPost } = require("../controllers/indexController");
const { upload } = require("../utils/multer");

const indexRouter = Router()

indexRouter.get("/", indexRouterGet);
indexRouter.post("/sell", upload.single('imgURL'), sellRouterPost);

module.exports = indexRouter;