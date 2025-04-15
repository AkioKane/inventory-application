async function sellRouterGet(req, res, next) {
  try {
    res.render("sell", {title: "Sell Items"});
  } catch (err) {
    next(err);
  }
}

module.exports = {
  sellRouterGet
}