import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { useState } from "react";

import {auth} from "../../services/firebaseConnection"
import {signInWithEmailAndPassword} from "firebase/auth"

import { useNavigate } from "react-router-dom";
 


export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(email === "" && password === ""){
            alert("Preencha todos os campos!")
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Logado com sucesso!")
            setEmail("")
            setPassword("")
            setTimeout(() => {
                navigate("/admin", {replace: true})
            }, 1000)

        })
        .catch((error) => {
            alert("Erro ao fazer login!" + error)
        })


    }

    return(
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orage-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-4">
                <Input
                    placeholder="digite o seu email...
                    "
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="********
                    "
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-600 rounded border-0 text-lg font-medium text-white transition-colors hover:bg-blue-900 duration-300 cursor-pointer px-4 py-2"
                type="submit">
                    Acessar
                </button>

            </form>
        </div>
    )
}