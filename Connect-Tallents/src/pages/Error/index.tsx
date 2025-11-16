import { Link } from "react-router-dom";
import Background from "../../components/Background/Background";

export default function Error() {
    return (
        <main className="erro-container">

            <Background />

            <div className="erro-card">
                <h1 className="erro-titulo">Página Não Encontrada</h1>
                <p className="erro-texto">
                    Parece que você tentou acessar uma rota que não existe.
                    Verifique o endereço ou volte para a página inicial.
                </p>

                <Link to="/" className="erro-botao">
                    Voltar para Home
                </Link>
            </div>

        </main>
    );
}
