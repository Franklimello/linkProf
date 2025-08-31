import {BiLogOut} from "react-icons/bi"
import {Link} from "react-router-dom"
import {auth} from "../../services/firebaseConnection"
import {signOut} from "firebase/auth"

export function Header(){
    async function handleLogout(){
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return(
        <header className="w-full max-w-4xl mt-6 px-2">
            <nav className="w-full bg-gradient-to-r from-slate-50 to-gray-50 backdrop-blur-sm border border-gray-200/50 h-16 flex items-center justify-between rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center items-center gap-8">
                    <Link 
                        to="/"
                        className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm uppercase tracking-wide group"
                    >
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link 
                        to="/admin"
                        className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm uppercase tracking-wide group"
                    >
                        Links
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link 
                        to="/admin/social"
                        className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm uppercase tracking-wide group"
                    >
                        Redes sociais
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </div>
                <button 
                    onClick={handleLogout}
                    className="relative p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group overflow-hidden"
                    title="Sair do sistema"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <BiLogOut size={20} className="relative z-10"/>
                </button>
            </nav>
        </header>
    )
}