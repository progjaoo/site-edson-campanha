"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  LogOut,
  Newspaper,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Noticia } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminNoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Campanha");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  // Load news list
  const loadNoticias = async () => {
    try {
      const res = await fetch("/api/noticias");
      if (res.ok) {
        const data = await res.json();
        setNoticias(data);
      }
    } catch (err) {
      console.error("Erro ao carregar:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNoticias();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImagemUrl(data.url);
        setImagePreview(data.url);
        setMessage({ type: "success", text: "Imagem carregada com sucesso!" });
      } else {
        setMessage({ type: "error", text: data.error || "Erro no upload da imagem." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao enviar imagem." });
    } finally {
      setUploadingImage(false);
    }
  };

  // Create news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/noticias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          categoria,
          resumo,
          conteudo,
          imagemUrl: imagemUrl || "/images/fotos-galeria/foto-galeria.svg",
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Notícia publicada com sucesso!" });
        setTitulo("");
        setResumo("");
        setConteudo("");
        setImagemUrl("");
        setImagePreview(null);
        loadNoticias();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Erro ao criar notícia." });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao salvar notícia." });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete news
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir a notícia "${title}"?`)) return;

    try {
      const res = await fetch(`/api/noticias?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Notícia excluída com sucesso." });
        loadNoticias();
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao excluir notícia." });
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gray-50 text-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-navy text-white p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-yellow text-brand-dark rounded-2xl">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-brand-yellow tracking-wider">Painel Oficial</span>
              <h1 className="font-condensed font-black text-2xl sm:text-3xl uppercase tracking-tight">
                Gerenciador de Notícias
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Ver Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Notificação / Mensagem de Feedback */}
        {message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna Esquerda: Formulário de Nova Notícia */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Plus className="w-5 h-5 text-brand-blue" />
              <h2 className="font-condensed font-black text-xl text-brand-navy uppercase tracking-tight">
                Publicar Nova Notícia
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Título da Notícia *
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Edson Albertassi visita bairros de Volta Redonda..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Categoria
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                >
                  <option value="Campanha">Campanha</option>
                  <option value="Propostas">Propostas</option>
                  <option value="Trajetória">Trajetória</option>
                  <option value="Valores">Valores & Família</option>
                  <option value="Agenda">Agenda Oficial</option>
                </select>
              </div>

              {/* Upload de Imagem */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Imagem de Capa (Vercel Blob / Upload)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-light hover:bg-gray-200 text-brand-navy text-xs font-bold uppercase border border-gray-300 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Enviando..." : "Selecionar Imagem"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Imagem pronta
                    </span>
                  )}
                </div>

                {imagePreview && (
                  <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden border border-gray-200">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Resumo */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Resumo / Subtítulo
                </label>
                <textarea
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  placeholder="Breve descrição que aparece no card da landing page..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>

              {/* Conteúdo Completo */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Conteúdo Completo da Matéria *
                </label>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Escreva aqui o texto completo da notícia. Parágrafos separados por linha dupla."
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-yellow text-brand-dark font-extrabold text-sm uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-all shadow-md disabled:opacity-50"
              >
                {submitting ? "Publicando..." : "Publicar Notícia"}
              </button>
            </form>
          </div>

          {/* Coluna Direita: Lista de Notícias Publicadas */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-brand-blue" />
                <h2 className="font-condensed font-black text-xl text-brand-navy uppercase tracking-tight">
                  Notícias Publicadas ({noticias.length})
                </h2>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-gray-500">Carregando notícias...</p>
            ) : noticias.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma notícia publicada ainda.</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {noticias.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-brand-blue/30 bg-brand-light flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-bold text-brand-blue uppercase">{item.categoria}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.dataPublicacao)}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm text-brand-navy line-clamp-1">
                        {item.titulo}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/noticias/${item.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white text-brand-blue hover:bg-brand-blue hover:text-white transition-colors shadow-sm"
                        title="Ver no site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id, item.titulo)}
                        className="p-2 rounded-lg bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
                        title="Excluir notícia"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
