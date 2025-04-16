async function sellRouterGet(req, res, next) {
  try {
    res.render("sell", {title: "Sell Item"});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sellRouterGet
}