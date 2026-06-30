"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Sparkles, Database, Code, ShoppingCart, User, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Mock products database
const INITIAL_PRODUCTS = [
  {
    id: "1",
    title: "n8n - Auto-Responder WhatsApp com IA",
    description: "Workflow completo que conecta o WhatsApp (via API Oficial ou Evolution) ao OpenAI para responder leads de forma inteligente e salvar no Notion.",
    price: 35.00,
    category: "n8n_workflow",
    author: "Gabriel D.",
    downloads: 142
  },
  {
    id: "2",
    title: "Prompt - Agente de SEO & Copywriting",
    description: "Prompt estruturado com técnicas de Machine Prompts para criar artigos de blog otimizados e com escrita humana impecável.",
    price: 15.00,
    category: "prompt",
    author: "Ana Clara",
    downloads: 89
  },
  {
    id: "3",
    title: "n8n - Sincronizador de CRM Hubspot & Pipedrive",
    description: "Automatize a sincronização bidirecional de contatos e negócios fechados entre HubSpot e Pipedrive com tratamento de erros integrado.",
    price: 50.00,
    category: "n8n_workflow",
    author: "Rodrigo M.",
    downloads: 64
  },
  {
    id: "4",
    title: "Prompt - Criador de Roteiros Virais para Reels/TikTok",
    description: "Framework de engenharia de prompts testado para criar ganchos de alta retenção e roteiros estruturados em 30 segundos.",
    price: 12.00,
    category: "prompt",
    author: "Lucas K.",
    downloads: 215
  },
  {
    id: "5",
    title: "n8n - Enriquecimento de Leads via Lusha & LinkedIn",
    description: "Workflow que detecta novas inscrições, busca perfil no LinkedIn, enriquece dados de contato via Lusha e atualiza a planilha de vendas.",
    price: 40.00,
    category: "n8n_workflow",
    author: "Gabriel D.",
    downloads: 98
  },
  {
    id: "6",
    title: "Prompt - Refatorador de Código Legado para Clean Code",
    description: "Prompt de alto desempenho para transformar trechos de códigos complexos e sem testes em códigos limpos, documentados e performáticos.",
    price: 18.00,
    category: "prompt",
    author: "Tech Lab",
    downloads: 123
  }
];

export default function MarketplacePage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [userBalance, setUserBalance] = useState(100.00); // Simulate Supabase profile balance
  const shouldReduceMotion = useReducedMotion();

  // Handle mock purchase
  const handleBuy = (product) => {
    if (userBalance >= product.price) {
      setUserBalance((prev) => prev - product.price);
      alert(`Compra de "${product.title}" simulada com sucesso! O arquivo/prompt foi liberado.`);
    } else {
      alert("Saldo insuficiente! Adicione mais créditos em seu painel.");
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-32 pb-20 z-10">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-extralight tracking-wide mb-2">
              MARKETPLACE
            </h1>
            <p className="text-sm font-light text-zinc-400">
              Explore automações do n8n e prompts criados por especialistas da comunidade.
            </p>
          </div>
          
          {/* User balance status */}
          <div className="px-5 py-3 rounded-2xl glassmorphism flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">SEU SALDO:</span>
            <span className="text-sm font-bold text-white font-mono">${userBalance.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Tabs */}
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                filter === "all" ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("n8n_workflow")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                filter === "n8n_workflow" ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Code size={14} />
              n8n Workflows
            </button>
            <button
              onClick={() => setFilter("prompt")}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                filter === "prompt" ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles size={14} />
              Prompts
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar por ferramentas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all duration-200 text-sm font-light"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={shouldReduceMotion ? {} : { y: -5 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="flex flex-col rounded-2xl border border-white/5 bg-zinc-950/40 hover:bg-zinc-950/70 hover:border-white/10 transition-all duration-300 overflow-hidden group shadow-lg"
            >
              {/* Header category badge */}
              <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                  {product.category === "n8n_workflow" ? (
                    <>
                      <Code size={12} className="text-indigo-400" />
                      n8n Workflow
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} className="text-purple-400" />
                      AI Prompt
                    </>
                  )}
                </span>
                
                <span className="text-xs font-light text-zinc-400 flex items-center gap-1">
                  <User size={10} />
                  {product.author}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm font-light text-zinc-400 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Footer and Price */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500">PREÇO</span>
                    <span className="text-lg font-bold text-white font-mono">${product.price.toFixed(2)}</span>
                  </div>

                  <motion.button
                    onClick={() => handleBuy(product)}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-zinc-100 transition-colors duration-200 text-sm font-semibold rounded-xl cursor-pointer"
                  >
                    <ShoppingCart size={14} />
                    Comprar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl mt-12 bg-white/[0.01]">
            <Compass size={48} className="mx-auto text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">Nenhum resultado encontrado</h3>
            <p className="text-sm font-light text-zinc-500">Tente buscar por termos diferentes ou filtre outra categoria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
