module.exports = (req, res, next) => {
	// checks if the user is logged in when trying to access a specific page
	if (!req.session.username) {
		
	  return res.redirect("/auth/login");
	}
	//req.username = req.session.username;
	next();
  };
  