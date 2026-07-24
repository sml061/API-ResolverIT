import { conn } from "../Config/mySql.js";
import { log } from "../Config/log.js"

export function CriarCall(Tipo, Mensagem, Usuario) {
    conn.query(
        "INSERT INTO Calls (Tipo, Mensagem, Usuario) VALUES (?, ?, ?);",
        [Tipo, Mensagem, Usuario],
        (err, result) => {
            if (err) {
                log("MySql Error", err);
            }

            log("MySql OK", "Dados inseridos com sucesso")
        }
    ) 
}