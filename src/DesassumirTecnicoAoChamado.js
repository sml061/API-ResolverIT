import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";

export async function DesassumirTecnicoAoChamado(id, Responsavel) {
    const ResponsavelPeloChamado = await VerificarResponsavelChamado(
        id,
        Responsavel,
    );

    if (ResponsavelPeloChamado === true) {
        ExecutarComando(id, Responsavel);
    } else {
        return false
    }
}

async function VerificarResponsavelChamado(id, Responsavel) {
    const [rows] = await conn
        .promise()
        .query("SELECT Tecnico_Respo FROM Calls WHERE ID = ?", [id]);

    if (rows[0].Tecnico_Respo === Responsavel) {
        return true;
    } else {
        return false;
    }
}

async function ExecutarComando(id, Responsavel) {
    const [rows] = await conn
        .promise()
        .query("UPDATE Calls SET Tecnico_Respo = NULL WHERE ID = ?", [id]);
}
