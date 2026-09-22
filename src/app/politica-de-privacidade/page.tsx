import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Política de Privacidade e LGPD",
    description:
      "Conheça as diretrizes de privacidade, segurança e proteção de dados do site oficial de Edson Albertassi.",
    pathname: "/politica-de-privacidade",
  }),
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="min-h-screen bg-white text-brand-dark pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase font-bold text-brand-blue hover:text-brand-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao início</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Segurança & Transparência</span>
          </div>
          <h1 className="font-condensed font-black text-4xl sm:text-5xl text-brand-navy uppercase tracking-tight">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-sm text-gray-500">
            Última atualização: 22 de setembro de 2026 • Em conformidade com a LGPD (Lei Federal nº 13.709/2018).
          </p>
        </div>

        {/* Conteúdo */}
        <div className="prose prose-lg max-w-none text-gray-700 font-normal leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-blue" />
              1. Compromisso com a sua Privacidade
            </h2>
            <p className="text-base">
              A campanha de <strong>Edson Albertassi (Deputado Estadual 15088)</strong> preza pela transparência, ética e segurança das informações de todos os cidadãos, eleitores e apoiadores que navegam por este site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy">
              3. Colinha eleitoral (tratamento local)
            </h2>
            <p className="text-base">
              A página <strong>/colinha-eleitoral</strong> foi criada para consulta pessoal e não carrega Google Analytics, Meta Pixel, anúncios ou outros serviços de medição. A lista de candidatos é uma cópia de dados públicos do TSE; sua escolha fica no armazenamento local do navegador para que você possa voltar, imprimir ou baixar a colinha. Não há login, formulário, perfil de eleitor ou envio automático dessas escolhas para a campanha. Se você limpar os dados do navegador, a seleção local poderá ser apagada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-blue" />
              2. Ferramenta &quot;Faça sua Foto&quot; (Processamento Local)
            </h2>
            <p className="text-base">
              A ferramenta de personalização de fotos para redes sociais é executada <strong>exclusivamente no navegador do seu dispositivo</strong> por meio da API HTML5 Canvas. A sua fotografia original e a arte gerada não são enviadas nem armazenadas em nossos servidores sem a sua ação voluntária de compartilhamento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-blue" />
              4. Coleta de Dados e Finalidade
            </h2>
            <p className="text-base">
              Em páginas gerais do site, usamos o Google Analytics 4 para estatísticas de audiência e o Meta Pixel para medir visitas relacionadas aos anúncios da campanha. Essas ferramentas opcionais só são carregadas quando você aceita os cookies opcionais; ao aceitar, ambas são ativadas, e ao recusar, ambas permanecem desativadas. Quando ativadas, podem receber informações sobre páginas visitadas, interações, navegador e dispositivo, além de usar cookies ou identificadores de publicidade. Essas informações podem ser processadas pelo Google e pela Meta conforme as políticas próprias de cada serviço. A página da colinha eleitoral é uma exceção intencional: nela esses scripts não são renderizados, mesmo que uma preferência tenha sido aceita em outra página. Você pode alterar sua decisão pelo link “Preferências de cookies” no rodapé. Guardamos essa escolha em um cookie próprio por até 180 dias.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy">
              5. Direitos do Titular (LGPD)
            </h2>
            <p className="text-base">
              Conforme o artigo 18 da Lei Geral de Proteção de Dados, você tem o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos dados e a eliminação de dados pessoais que tenham sido fornecidos mediante consentimento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo font-bold text-xl text-brand-navy">
              6. Contato do Encarregado de Dados (DPO)
            </h2>
            <p className="text-base">
              Para dúvidas sobre esta política de privacidade ou solicitações relacionadas aos seus dados, entre em contato pelos nossos canais oficiais de comunicação.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
