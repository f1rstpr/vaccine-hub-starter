const { UnauthorizedError } = require("../utils/errors");

class User {
    static async login(credentials) {
        throw new UnauthorizedError("invalid email/pw");
    }

    static async register(credentials) {
        // submit info

        // throw error if one of the info is missing or email alrdy exist

        // hash pw

        // create new user in db

        throw new UnauthorizedError("");
    }
}

module.exports = User;
