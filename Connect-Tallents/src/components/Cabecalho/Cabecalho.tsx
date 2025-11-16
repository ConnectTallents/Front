import { Link } from "react-router-dom";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho_container">
        <div className="cabecalho_logo">
          <Link to="/">
            <h1 className="cabecalho_titulo">
              Connect Tallents
            </h1>
          </Link>
        </div>

      </div>
    </header>
  );
}
