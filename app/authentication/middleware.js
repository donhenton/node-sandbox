function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
        res.render('secure/login', {
            title: 'Login page'
        });
  }
}

module.exports = authenticationMiddleware;