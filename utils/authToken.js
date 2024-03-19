import jwt from 'jsonwebtoken';

async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                reject({ status: 403, message: 'Invalid token.' });
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = verifyToken;
