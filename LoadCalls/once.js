import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";

export async function LoadCallDetailsMain(id) {
    const [rows] = await conn.promise().query("SELECT * FROM Calls WHERE ID = ?", [id]);

    return rows
}