const crypto = require('crypto');

const passwordHash = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password)
    return hash.digest('hex');
}

module.exports = passwordHash;