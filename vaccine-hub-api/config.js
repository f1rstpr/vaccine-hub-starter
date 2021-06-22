// require("dotenv").config()
// require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_PASS
        ? encodeURI(process.env.DATABASE_PASS)
        : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || "vaccine_hub";

    return (
        process.env.DATABASE_URL ||
        `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    );
}

const BCRYPT_WORK_FACTOR = 10;

// console.log("process.env", Object.keys(process.env));
console.log("App Config");
console.log("PORT:", PORT);
console.log("Database URI:", getDatabaseUri());
console.log("---");
module.exports = {
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
};
