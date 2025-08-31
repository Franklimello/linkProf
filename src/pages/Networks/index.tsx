import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaSave, FaLink } from "react-icons/fa";
import { FiCheck, FiAlertCircle, FiEye } from "react-icons/fi";
 import type { Dispatch, SetStateAction } from "react"

import {db} from "../../services/firebaseConnection"
import {setDoc, getDoc, doc} from "firebase/firestore"

export function Networks(){
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [errors, setErrors] = useState({
        facebook: "",
        instagram: "", 
        youtube: ""
    })

    // Validação de URLs
    const validateUrl = (url: string, platform: string) => {
        if (!url) return ""
        
        const patterns = {
            facebook: /^https?:\/\/(www\.)?(facebook|fb)\.com\/.+/,
            instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
            youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/
        }
        
        if (!patterns[platform as keyof typeof patterns].test(url)) {
            return `URL inválida para ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
        }
        return ""
    }

           
            const handleInputChange = (
            value: string,
            setter: Dispatch<SetStateAction<string>>,
            platform: string
            ) => {
            setter(value)
            const error = validateUrl(value, platform)
            setErrors(prev => ({ ...prev, [platform]: error }))
            setIsSaved(false)
            }


    async function handleRegister(e: React.FormEvent){
        e.preventDefault()
        
        // Validar todos os campos
        const fbError = validateUrl(facebook, 'facebook')
        const igError = validateUrl(instagram, 'instagram') 
        const ytError = validateUrl(youtube, 'youtube')
        
        setErrors({
            facebook: fbError,
            instagram: igError,
            youtube: ytError
        })

        if (fbError || igError || ytError) return

        setIsLoading(true)

        try {
            await setDoc(doc(db,"social","link"),{
                facebook: facebook,
                instagram: instagram,
                youtube: youtube
            })

            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 3000)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        async function loadLinks(){
            try {
                const docref = doc(db,"social","link")
                const snapshot = await getDoc(docref)
                
                if(snapshot.exists() && snapshot.data()){
                    setFacebook(snapshot.data()?.facebook || "")
                    setInstagram(snapshot.data()?.instagram || "")
                    setYoutube(snapshot.data()?.youtube || "")
                }
            } catch (error) {
                console.log("Erro ao carregar links:", error)
            }
        }
        loadLinks()
    },[])
    
    const hasValidLinks = facebook || instagram || youtube
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative flex flex-col items-center min-h-screen pb-12 px-4">
                <Header/>

                {/* Main Content */}
                <div className="w-full max-w-4xl mt-8">
                    
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                                <FaLink className="text-blue-400" size={28}/>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Redes Sociais
                            </h1>
                        </div>
                        <p className="text-gray-400 max-w-md mx-auto">
                            Configure os links das suas redes sociais para aparecerem no seu perfil
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
                        
                        {/* Success Message */}
                        {isSaved && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                                <FiCheck className="text-green-400" size={20}/>
                                <span className="text-green-300 font-medium">Links salvos com sucesso!</span>
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-8">
                            
                            {/* Facebook */}
                            <div className="group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <FaFacebook className="text-blue-400" size={20}/>
                                    </div>
                                    <label className="font-semibold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                                        Facebook
                                    </label>
                                </div>
                                <Input
                                    type="url"
                                    placeholder="https://www.facebook.com/seuusuario"
                                    value={facebook}
                                    onChange={(e) => handleInputChange(e.target.value, setFacebook, 'facebook')}
                                    variant="filled"
                                    size="lg"
                                    error={errors.facebook}
                                />
                            </div>

                            {/* YouTube */}
                            <div className="group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <FaYoutube className="text-red-400" size={20}/>
                                    </div>
                                    <label className="font-semibold bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
                                        YouTube
                                    </label>
                                </div>
                                <Input
                                    type="url"
                                    placeholder="https://www.youtube.com/@seucanal"
                                    value={youtube}
                                    onChange={(e) => handleInputChange(e.target.value, setYoutube, 'youtube')}
                                    variant="filled"
                                    size="lg"
                                    error={errors.youtube}
                                />
                            </div>

                            {/* Instagram */}
                            <div className="group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                                        <FaInstagram className="text-purple-400" size={20}/>
                                    </div>
                                    <label className="font-semibold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                                        Instagram
                                    </label>
                                </div>
                                <Input
                                    type="url"
                                    placeholder="https://www.instagram.com/seuusuario"
                                    value={instagram}
                                    onChange={(e) => handleInputChange(e.target.value, setInstagram, 'instagram')}
                                    variant="filled"
                                    size="lg"
                                    error={errors.instagram}
                                />
                            </div>

                            {/* Preview Section */}
                            {hasValidLinks && (
                                <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FiEye className="text-gray-400" size={18}/>
                                        <span className="text-gray-300 font-medium">Preview das Redes</span>
                                    </div>
                                    
                                    <div className="flex justify-center gap-4">
                                        {facebook && (
                                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors duration-300">
                                                <FaFacebook size={24} className="text-blue-400"/>
                                            </div>
                                        )}
                                        {youtube && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors duration-300">
                                                <FaYoutube size={24} className="text-red-400"/>
                                            </div>
                                        )}
                                        {instagram && (
                                            <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-colors duration-300">
                                                <FaInstagram size={24} className="text-purple-400"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                disabled={isLoading || Object.values(errors).some(error => error !== "")}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 h-14 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Salvando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave size={18}/>
                                        Salvar Links
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Tips Section */}
                        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                            <div className="flex items-start gap-3">
                                <FiAlertCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={18}/>
                                <div className="text-sm text-blue-200">
                                    <p className="font-medium mb-1">Dicas importantes:</p>
                                    <ul className="space-y-1 text-blue-300/80">
                                        <li>• Use URLs completas com https://</li>
                                        <li>• Certifique-se de que os perfis são públicos</li>
                                        <li>• Os links aparecerão na sua página inicial</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}