import express from "express";
import cors from "cors";
import { CriarCall } from "./RegisterCall/script.js";
import { log } from "./Config/log.js";
import { CheckIsAdmin } from "./mySql/CheckIsAdmin.js";
import { oncePersonCalls } from "./LoadCalls/once.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/CriarCall", (req, res) => {
    const { Tipo, Mensagem, Usuario } = req.body;

    CriarCall(Tipo, Mensagem, Usuario);

    res.json({
        sucesso: true,
        mensagem: "Chamado recebido."
    });
})

app.get("/VerCall/once/:usuario", (req, res) => {
    const Usuario = req.params.usuario
    oncePersonCalls(Usuario)
})

app.listen(3000, () => {
    log("System", "Servidor iniciado");
})