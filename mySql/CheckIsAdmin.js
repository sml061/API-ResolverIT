import { conn } from "../Config/mySql.js";
import { log } from "../Config/log.js"

export async function CheckIsAdmin(nome) {
    const [rows] = await conn.promise().query(
        "SELECT is_admin FROM usuarios WHERE usuario = ?",
        [nome]
    );

    return rows.length > 0 && rows[0].is_admin === 1;
}