import express from "express";
import cors from "cors";
import { CriarCall } from "./RegisterCall/script.js";
import { log } from "./Config/log.js";
import { CheckIsAdmin } from "./mySql/CheckIsAdmin.js";
import { LoadCallsMain } from "./LoadCalls/LoadCalls.js";
import { LoadCallDetailsMain } from "./LoadCalls/once.js";
import { AssumirChamado } from "./src/AssumirTecnicoAoChamado.js";
import { VerificarSeChamadoJaEstaAssumido } from "./src/VerificarSeChamadoJaEstaAssumido.js";
import { DesassumirTecnicoAoChamado } from "./src/DesassumirTecnicoAoChamado.js";

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

app.post("/AssumirTecnicoAoChamado", (req, res) => {
    const { idChamado, Responsavel } = req.body;

    AssumirChamado(idChamado, Responsavel);

    res.json({
        sucesso: true,
        mesnagem: "Responsavel atribuido",
    });
});

app.get("/VerificarSeChamadoJaEstaAssumido/:id", async (req, res) => {
    const id = req.params.id;
    const dados = await VerificarSeChamadoJaEstaAssumido(id);

    if (dados === true) {
        res.json({
            EstaAtribuido: true,
        });
    } else {
        res.json({
            EstaAtribuido: false,
        });
    }
});

app.post("/DesassumirTecnicoAoChamado", async (req, res) => {


    try {

        const { idChamado, Responsavel } = req.body;

        const resultado = await DesassumirTecnicoAoChamado(
            idChamado,
            Responsavel
        );

        res.json({
            sucesso: true,
            resultado: resultado
        });

    } catch (error) {

        console.error("Erro ao desassumir:", error);

        res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

app.listen(3000, "0.0.0.0", () => {
    log("System", "Servidor iniciado");
});
