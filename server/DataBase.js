import mysql from "mysql2";

const pool = await mysql.createPool({
    host:"localhost",
    user:"root",
    password: "HiraK@#2808",
    database:"jec"
});

export default pool;
