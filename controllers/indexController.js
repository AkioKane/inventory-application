const indexRouterGet = (req, res) => {
  res.render("index", {title: "Home"})
}

module.exports = {
  indexRouterGet
}