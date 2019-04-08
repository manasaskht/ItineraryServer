const jwt = require('jsonwebtoken');
module.exports = async function (req, res, proceed) {
    if (req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ');
        if (authorization.length == 2) {
            let isVerified = false;
            try {
                isVerified = jwt.verify(authorization[1], sails.config.session.secret);
            } catch (err) {
                res.forbidden(err);
            }

            if (isVerified) {
                let payload = jwt.decode(authorization[1]);
                req['me'] = await User.findOne({ id: payload.userId });
                if (req['me']) {
                    return proceed();
                } else {
                    res.forbidden({ message: 'Invalid user.' });
                }
            } else {
                res.forbidden({ message: 'Invalid token. Please login again.' });
            }
        } else {
            return res.forbidden({ message: 'Invalid authentication format.' });
        }
    } else {
        return res.forbidden({ message: 'Authorization token required for access.' })
    }
    return proceed();
}