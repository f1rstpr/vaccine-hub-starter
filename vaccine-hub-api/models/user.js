const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            date: user.date,
        };
    }

    static async login(credentials) {
        const requiredFields = ["email", "password"];

        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request.body`);
            }
        });

        const user = await User.fetchUserByEmail(credentials.email);

        if (user) {
            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );
            if (isValid) {
                return User.makePublicUser(user);
            }
        }

        throw new UnauthorizedError("Invalid email/password combo");
    }

    static async register(credentials) {
        const requiredFields = [
            "password",
            "first_name",
            "last_name",
            "email",
            "location",
            "date",
        ];

        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request.body`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError(`invalid email`);
        }

        const existingUser = await User.fetchUserByEmail(credentials.email);

        if (existingUser) {
            throw new BadRequestError(`duplicate email: ${credentials.email}`);
        }

        const lowercasedEmail = credentials.email.toLowerCase();

        const hashedPassword = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );

        const result = await db.query(
            `
            INSERT INTO USERS (
                password, first_name, last_name, email, location, date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, password, first_name, last_name, email, location, date
            `,
            [
                hashedPassword,
                credentials.first_name,
                credentials.last_name,
                lowercasedEmail,
                credentials.location,
                credentials.date,
            ]
        );

        const user = result.rows[0];

        return User.makePublicUser(user);
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("no email provided");
        }

        const query = "SELECT * FROM users WHERE email = $1";

        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }
}

module.exports = User;
