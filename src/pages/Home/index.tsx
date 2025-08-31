import {Social} from "../../components/Social"
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa"
import {FiExternalLink, FiLink2} from "react-icons/fi"
import {db} from "../../services/firebaseConnection"
import {collection, getDocs, orderBy, query, doc, getDoc} from "firebase/firestore"
import {useEffect, useState} from "react"
import Perfil from "../../assets/perfil.jpeg"

interface LinkProps{
    id: string,
    name: string,
    url: string,
    color: string,
    bg: string,
}

interface SocialLinksProps{
    facebook: string,
    instagram: string,
    youtube: string,
}

export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        async function loadLinks(){
            try {
                const linksRef = collection(db, "links")
                const q = query(linksRef, orderBy("created", "asc"))
                const querySnapshot = await getDocs(q)
                const links = [] as LinkProps[]
                querySnapshot.forEach((doc)=>{
                    links.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        color: doc.data().color,
                        bg: doc.data().bg,
                    })
                })
                setLinks(links)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        loadLinks()
    },[])

    useEffect(()=>{
        async function loadSocialLinks(){
            try {
                const socialRef = doc(db, "social", "link")
                const snapshot = await getDoc(socialRef)
                if(snapshot.exists()){
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        loadSocialLinks()
    },[])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/80 font-medium">Carregando links...</p>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Stars Background */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative flex flex-col w-full py-8 items-center justify-center px-4 min-h-screen">
                
                {/* Profile Section */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="relative inline-block mb-6">
                        <div className=" h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-[3px] mx-auto shadow-2xl animate-float">
                            {/* Foto de perfil redonda */}
                            <img 
                                src={Perfil} 
                                alt="foto de perfil"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 animate-gradient">
                        Franklim Melo
                    </h1>
                    
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FiLink2 className="text-blue-300" size={18}/>
                        <span className="text-blue-100 text-lg font-medium">Desenvolvedor & Creator</span>
                    </div>
                    
                    <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                        Explore todos os meus projetos e redes sociais em um só lugar ✨
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-white/60">
                        <div className="flex -space-x-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white/20"></div>
                            ))}
                        </div>
                        <span className="text-sm">+{links.length} links disponíveis</span>
                    </div>
                </div>

                {/* Links Section */}
                <main className="w-full max-w-lg space-y-4 animate-fade-in-up animation-delay-300">
                    {links.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiLink2 className="text-white/50" size={32}/>
                            </div>
                            <p className="text-white/60 text-lg">Nenhum link disponível ainda</p>
                        </div>
                    ) : (
                        links.map((link, index) => (
                            <section 
                                key={link.id}
                                className="group relative"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block w-full p-4 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                                    style={{
                                        backgroundColor: `${link.bg}20`,
                                        boxShadow: `0 8px 32px ${link.bg}20`
                                    }}
                                >
                                    {/* Gradient overlay on hover */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${link.bg}, ${link.color})`
                                        }}
                                    />
                                    
                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className="w-3 h-3 rounded-full"
                                                style={{backgroundColor: link.bg}}
                                            />
                                            <p 
                                                className="text-lg font-semibold"
                                                style={{color: link.color}}
                                            >
                                                {link.name}
                                            </p>
                                        </div>
                                        
                                        <FiExternalLink 
                                            size={18} 
                                            className="text-white/60 group-hover:text-white/80 transition-colors duration-300 transform group-hover:scale-110"
                                        />
                                    </div>
                                    
                                    {/* Hover glow effect */}
                                    <div 
                                        className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl -z-10 rounded-2xl"
                                        style={{
                                            background: `linear-gradient(135deg, ${link.bg}, ${link.color})`
                                        }}
                                    />
                                </a>
                            </section>
                        ))
                    )}
                </main>

                {/* Social Links */}
                {socialLinks && Object.values(socialLinks).some(link => link) && (
                    <footer className="mt-12 animate-fade-in-up animation-delay-600">
                        <div className="text-center mb-6">
                            <h3 className="text-white/80 font-medium mb-2">Conecte-se comigo</h3>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="flex justify-center gap-6">
                            {socialLinks?.facebook && (
                                <Social url={socialLinks.facebook}>
                                    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20">
                                        <FaFacebook size={28} className="text-white"/>
                                    </div>
                                </Social>
                            )}
                            {socialLinks?.instagram && (
                                <Social url={socialLinks.instagram}>
                                    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20">
                                        <FaInstagram size={28} className="text-white"/>
                                    </div>
                                </Social>
                            )}
                            {socialLinks?.youtube && (
                                <Social url={socialLinks.youtube}>
                                    <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/20">
                                        <FaYoutube size={28} className="text-white"/>
                                    </div>
                                </Social>
                            )}
                        </div>
                    </footer>
                )}

                {/* Footer */}
                <div className="mt-16 text-center text-white/40 text-sm">
                    <p>© 2025 Franklim Melo. Feito com ❤️</p>
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .animation-delay-600 {
                    animation-delay: 600ms;
                }
            `}</style>
        </div>
    )
}