export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumo?: string;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: string;
  autor?: string;
  categoria?: string;
}

export type PhotoFormat = "avatar" | "feed" | "story" | "round";

export interface FormatConfig {
  id: PhotoFormat;
  label: string;
  width: number;
  height: number;
  aspectRatio: string;
  description: string;
}

export interface FrameTemplate {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
}

export interface AdminUser {
  username: string;
  role: "admin";
}
