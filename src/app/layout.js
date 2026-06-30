import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "ARTEFACT - Mercado de Automações e Prompts",
  description: "Compre e venda workflows prontos do n8n e prompts avançados de inteligência artificial de forma justa e colaborativa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-black text-white selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
