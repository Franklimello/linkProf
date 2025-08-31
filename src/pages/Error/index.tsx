import { Link } from "react-router-dom";

export function ErrorPage(){
    return(
        <div className="flex flex-col items-center justify-center h-screen w-full text-white">
            <h1 className="font-bold text-5xl mb-4">404</h1>
            <h1 className="font-bold text-4xl mb-4">
                Pagina nao encontrada
            </h1>
            <p className="text-xl mb-8
            italic">Voçe caiu em uma pagina que nao existe</p>

            <Link to="/" className="bg-gray-50/20 py-1 px-2 rounded-md text-white hover:bg-gray-50/70">Voltar para Home</Link>
        </div>
    )
}