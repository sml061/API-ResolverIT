import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";
import { CheckIsAdmin } from "../mySql/CheckIsAdmin.js";

export async function LoadCallsMain(nome) {
    const isAdmin = await CheckIsAdmin(nome);

    if (isAdmin) {
        const calls = await allCalls();
        if (calls) {
            return calls;
        } else {
            return "Nenhum Chamado";
        }
    } else {
        const calls = await oncePersonCalls(nome);
        if (calls) {
            return calls;
        } else {
            return "Nenhum Chamado";
        }
    }
}

async function oncePersonCalls(usuario) {
    const [rows] = await conn
        .promise()
        .query(`SELECT * FROM Calls WHERE Usuario = ? AND Ativo = 1`, [usuario]);

    return rows.length > 0 && rows;
}

async function allCalls() {
    const [rows] = await conn.promise().query("SELECT * FROM Calls WHERE Ativo = 1");

    return rows.length > 0 && rows;
}
