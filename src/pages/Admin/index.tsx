import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { FiTrash, FiLink, FiEye, FiPlus } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, orderBy } from "firebase/firestore"

interface LinkProps {
  id: string
  name: string
  url: string
  color: string
  bg: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [colorInput, setColorInput] = useState("#3b82f6")
  const [backgroundColor, setBackgroundColor] = useState("#1f2937")
  const [links, setLinks] = useState<LinkProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    if (!nameInput || !urlInput) return

    setIsLoading(true)
    try {
      await addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        color: colorInput,
        bg: backgroundColor,
        created: new Date()
      })

      setNameInput("")
      setUrlInput("")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "links", id))
      // Atualiza o estado local imediatamente para evitar conflito
      setLinks(prev => prev.filter(link => link.id !== id))
    } catch (error) {
      console.log("Erro ao deletar:", error)
    }
  }

  useEffect(() => {
    const linksRef = collection(db, "links")
    const q = query(linksRef, orderBy("created", "asc"))

    // onSnapshot já garante updates em tempo real
    const unsub = onSnapshot(q, (snapshot) => {
      const lista: LinkProps[] = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        color: doc.data().color,
        bg: doc.data().bg
      }))

      setLinks(lista)
    })

    return () => unsub()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative flex flex-col items-center min-h-screen pb-12 px-4">
        <Header />

        <div className="w-full max-w-4xl mt-8 space-y-8">
          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FiLink className="text-blue-400" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Criar Novo Link
              </h1>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Nome do Link"
                  placeholder="Ex: Meu Portfolio"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  variant="filled"
                  size="lg"
                />
                <Input
                  label="URL do Link"
                  type="url"
                  placeholder="https://exemplo.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  variant="filled"
                  size="lg"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 ml-1">Cor do Texto</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="w-full h-12 rounded-xl border-2 border-gray-600 bg-gray-800 cursor-pointer"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">{colorInput}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300 ml-1">Cor de Fundo</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-12 rounded-xl border-2 border-gray-600 bg-gray-800 cursor-pointer"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">{backgroundColor}</div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {nameInput && (
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <FiEye className="text-gray-400" size={18} />
                    <span className="text-gray-300 font-medium">Preview do Link</span>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className="w-full max-w-md py-4 px-6 rounded-xl font-semibold text-center cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor, color: colorInput }}
                    >
                      {nameInput}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !nameInput || !urlInput}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 h-14 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></div> : <><FiPlus size={20}/>Criar Link</>}
              </button>
            </form>
          </div>

          {/* Links List */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Links Cadastrados</h2>
              <div className="bg-gray-800/50 px-3 py-1 rounded-full">
                <span className="text-gray-300 text-sm font-medium">{links.length} {links.length === 1 ? 'link' : 'links'}</span>
              </div>
            </div>

            {links.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiLink className="text-gray-500" size={32} />
                </div>
                <p className="text-gray-400 text-lg">Nenhum link cadastrado ainda</p>
                <p className="text-gray-500 text-sm mt-2">Crie seu primeiro link usando o formulário acima</p>
              </div>
            ) : (
              <div className="space-y-3">
                {links.map((item) => (
                  <article
                    key={item.id}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: `${item.bg}15` }}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.bg }} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate" style={{ color: item.color }}>{item.name}</p>
                        <p className="text-gray-400 text-sm truncate">{item.url}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      title="Deletar link"
                    >
                      <FiTrash size={16} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
