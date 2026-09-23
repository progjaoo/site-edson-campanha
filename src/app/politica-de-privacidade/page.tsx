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
              A página <strong>/colinha-eleitoral</strong> foi criada para consulta pessoal e não carrega Google Analytics, Meta Pixel, anúncios ou outros serviços de medição, mesmo que você tenha autorizado essas ferramentas em outra página. A lista de candidatos reproduz dados públicos do TSE. As escolhas e o nome opcional usado para personalizar a arte ficam no armazenamento local deste navegador; não são enviados à campanha pela ferramenta. Ao usar “Passar Cola”, você escolhe o aplicativo para o qual enviar a imagem e o link. Se o compartilhamento de arquivos não estiver disponível, a imagem é baixada e o WhatsApp abre com a mensagem e o link para você anexá-la. A campanha não recebe cópia; o uso pelo aplicativo escolhido segue as regras desse serviço. Não há login, formulário ou perfil de eleitor. O botão “Restaurar exemplo” apaga o nome salvo e volta às seleções iniciais. Para apagar as escolhas por completo, limpe os dados deste site nas configurações do navegador.
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
              Nas páginas institucionais, o Google Analytics 4 pode medir audiência e o Meta Pixel pode medir visitas relacionadas aos anúncios da campanha. São finalidades opcionais e independentes: nenhum desses scripts é carregado antes de uma escolha afirmativa para sua categoria. Você pode aceitar ou recusar cada categoria separadamente, recusar todas sem perder acesso ao site e mudar ou revogar a decisão pelo botão “Gerenciar cookies” no rodapé. Um cookie próprio guarda as preferências escolhidas por até 180 dias. Na página da colinha eleitoral, o Google Analytics e o Meta Pixel permanecem desativados qualquer que seja essa escolha. Para detalhes sobre cookies e proteção de dados, consulte também o{" "}
              <a
                href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue underline underline-offset-2"
              >
                Guia Orientativo da ANPD
              </a>
              .
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
