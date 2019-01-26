module.exports = function(req, res, next){
    if(!req.agency.isAdmin) return res.status(401).send('Access Denied You Are not admin');
    next();
}