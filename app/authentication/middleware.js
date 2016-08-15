function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
        res.render('secureLocal/login', {
            title: 'Login page'
        });
  }
}

module.exports = authenticationMiddleware;