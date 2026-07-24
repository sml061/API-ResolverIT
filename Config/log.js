import { exit } from "node:process";

export function log (tipo, mensagem) {
    console.log(`[${tipo}]: ${mensagem}`)
    if (tipo === "Error") {
        exit()
    }
}