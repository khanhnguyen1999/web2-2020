module.exports = function(req,res){
    delete req.session.userId;
    res.redirect('/')
}