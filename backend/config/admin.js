module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin){
            middleware(req, res, next)
        } else {
            return res.send(401).send('Usuário não é administrador.')
        }
    }
}