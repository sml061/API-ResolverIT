import { conn } from "../Config/mySql.js";
import { log } from "../Config/log.js";

export function CriarCall(Tipo, Observacao, Mensagem, Usuario) {
    conn.query(
        "INSERT INTO Calls (Tipo, Mensagem, Usuario, Observacao) VALUES (?, ?, ?, ?);",
        [Tipo, Mensagem, Usuario, Observacao],
        (err, result) => {
            if (err) {
                log("MySql Error", err);
            }

            log("MySql OK", "Dados inseridos com sucesso");
        },
    );
}
