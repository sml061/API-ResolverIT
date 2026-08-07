export async function VerificarSeChamadoJaEstaAssumido (id) {
    const [rows] = await conn
    .promise()
    .query("SELECT Tecnico_Respo FROM Calls WHERE id = ?")
}