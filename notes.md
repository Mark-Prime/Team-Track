req.isAuthenticated() - true if user is logged in & false otherwise
req.user - gives you the logged in user info
rejectUnauthenticated - middleware to protect routes from access by the public or people not logged in.