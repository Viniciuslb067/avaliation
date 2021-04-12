const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.json")

module.exports = (req, res, next) => {
    const authHeader = req.query.token;

    console.log(authHeader)

    if (!authHeader)
        return res.status(401).json({ status: 2, error: "Token não foi informado!" });

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
        return res.status(401).json({ status: 2, error: "Erro no token" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ status: 2, error: "Token fora do padrão" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).json({ status: 2, error: "Token inválido" });

        req.userId = decoded.id
        return next();
    })
}