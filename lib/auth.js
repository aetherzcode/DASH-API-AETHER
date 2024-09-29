module.exports = {
	isAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		req.flash('error_msg', 'Silahkan Masuk Untuk Memulai Session.');
		res.redirect('/login');
	},
	notAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) { return next(); }
		res.redirect('/dashboard');
	}
};