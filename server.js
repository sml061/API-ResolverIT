import express from "express";
import cors from "cors";
import { CriarCall } from "./RegisterCall/script.js";
import { log } from "./Config/log.js";
import { CheckIsAdmin } from "./mySql/CheckIsAdmin.js";
import { LoadCallsMain } from "./LoadCalls/LoadCalls.js";
import { LoadCallDetailsMain } from "./LoadCalls/once.js";

// import https from "https";
// import fs from "fs";

// const options = {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert")
// };

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    }),
);
app.use(express.json());
app.use(express.static("public"));

app.post("/CriarCall", (req, res) => {
    const { Tipo, ObsInput, Mensagem, Usuario } = req.body;

    CriarCall(Tipo, ObsInput, Mensagem, Usuario);

    res.json({
        sucesso: true,
        mensagem: "Chamado recebido.",
    });
});

app.get("/VerCall/once/:usuario", async (req, res) => {
    const usuario = req.params.usuario;

    const dados = await LoadCallsMain(usuario);

    res.json(dados);
});

app.get("/DetalhesCall/:id", async (req, res) => {
    const id = req.params.id;

    const dados = await LoadCallDetailsMain(id);

    res.json(dados);
});

app.listen(3000, "0.0.0.0", () => {
    log("System", "Servidor iniciado");
});
