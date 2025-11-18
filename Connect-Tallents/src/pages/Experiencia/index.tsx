// src/pages/Experiencia/Experiencia.tsx

import { useEffect, useState } from "react";
import { endpoints } from "../../services/endpoint";
import { Usuario, Mensagem, Avaliacao } from "../../types/Dominio";

import BackgroundNeon from "../../components/Background/Background";
import UsersSideBar from "../../components/UsersSideBar/UsersSideBar";
import Tendencias from "../../components/Tendencias/Tendencias";
import PostCarregamento from "../../components/Carregamento/Carregamento";

import CriarExperiencia from "../../components/CriarExperiencia/CriarExperiencia";
import CardExperiencia from "../../components/CardExperiencia/CardExperiencia";

type Experiencia = Mensagem & {
    usuario?: Usuario | null;
    aavaliacao?: Avaliacao | null;
};

export default function Experiencia() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarTudo() {
        try {
            setCarregando(true);

            const usuariosData = await endpoints.listarUsuarios();
            const mensagensData = await endpoints.listarMensagens();
            const avaliacoesData = await endpoints.listarAvaliacoes();

            // Mapa Users
            const mapaUsuarios: Record<number, Usuario> = {};
            usuariosData.forEach((u: any) => (mapaUsuarios[u.codigo] = u));

            // Mapa Avaliações agrupado por (usuario + projeto)
            const mapaAval: Record<string, Avaliacao> = {};
            avaliacoesData.forEach((a: any) => {
                const chave = `${a.cdUsuario}-${a.cdProjeto}`;
                mapaAval[chave] = a;
            });

            // Monta lista completa de experiências
            const experienciasCompletas = mensagensData.map((m) => {
                const usuario = mapaUsuarios[m.idUsuario] || null;
                const avaliacao = mapaAval[`${m.idUsuario}-${m.idProjeto}`] || null;

                return {
                    ...m,
                    usuario,
                    avaliacao
                };
            });

            setUsuarios(usuariosData);
            setAvaliacoes(avaliacoesData);
            setExperiencias(experienciasCompletas.reverse());

        } catch (e) {
            console.error("Erro ao carregar experiências:", e);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarTudo();
    }, []);

    // Criar nova experiência
    async function criarExperiencia(conteudo: string) {
        const nova = await endpoints.criarMensagem({
            conteudo,
            idUsuario: 1, // usuário fixo (trocar futuramente)
            dataEnvio: new Date().toISOString(),
            idProjeto: 1
        });

        setExperiencias([
            { ...nova, usuario: usuarios.find(u => u.codigo === 1) },
            ...experiencias
        ]);
    }

    return (
        <main className="global-container">
            <BackgroundNeon />

            <h1 className="global-titulo">Experiências de Usuários</h1>

            <div className="global-layout">
                <UsersSideBar usuario={usuarios} />

                <div className="global-feed">
                    <CriarExperiencia onPostar={criarExperiencia} />

                    {carregando ? (
                        <>
                            <PostCarregamento />
                            <PostCarregamento />
                            <PostCarregamento />
                        </>
                    ) : (
                        experiencias.map((exp) => (
                            <CardExperiencia key={exp.codigo} experiencia={exp} />
                        ))
                    )}
                </div>

                <Tendencias />
            </div>
        </main>
    );
}
