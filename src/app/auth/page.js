"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Lock, User, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Materializing transition values from Design Motion principles (Jakub Krehel)
  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20, filter: shouldReduceMotion ? "none" : "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        duration: 0.55,
        bounce: 0,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10, filter: shouldReduceMotion ? "none" : "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.4, bounce: 0 } },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black overflow-hidden font-sans">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-black to-zinc-950/30 z-0" />

      {/* Back to Home Button */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group z-10 text-sm font-light">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
        Voltar para Home
      </Link>

      {/* Main glass card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 rounded-3xl glassmorphism z-10 relative flex flex-col items-center shadow-2xl"
      >
        {/* Brand header */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <Image src="/icons/galaxy.png" alt="Galaxy" width={28} height={28} className="w-7 h-7 object-contain" />
          <span 
            className="text-lg tracking-[0.2em] font-extralight text-white font-mono"
            style={{ fontFamily: "'Trebuchet MS', Arial, sans-serif" }}
          >
            ARTEFACT
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center text-white mb-2">
          {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-sm font-light text-zinc-400 text-center mb-8">
          {isLogin 
            ? "Acesse seus workflows e prompts comprados" 
            : "Comece a vender e comprar automações exclusivas"}
        </motion.p>

        {/* Form */}
        <form className="w-full flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <motion.div variants={itemVariants} className="relative w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-zinc-500">
                <User size={18} />
              </span>
              <input
                type="text"
                placeholder="Nome de usuário"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all duration-200 text-sm font-light"
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="relative w-full">
            <span className="absolute inset-y-0 left-4 flex items-center text-zinc-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              placeholder="Endereço de e-mail"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all duration-200 text-sm font-light"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative w-full">
            <span className="absolute inset-y-0 left-4 flex items-center text-zinc-500">
              <Lock size={18} />
            </span>
            <input
              type="password"
              placeholder="Senha de acesso"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all duration-200 text-sm font-light"
            />
          </motion.div>

          {isLogin && (
            <motion.div variants={itemVariants} className="text-right">
              <a href="#" className="text-xs font-light text-indigo-400 hover:text-indigo-300 transition-colors">
                Esqueceu sua senha?
              </a>
            </motion.div>
          )}

          {/* Action button with tactile response */}
          <motion.button
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="w-full mt-2 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{isLogin ? "Entrar na Plataforma" : "Criar Minha Conta"}</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>
        </form>

        {/* Toggle Form type link */}
        <motion.p variants={itemVariants} className="mt-8 text-xs font-light text-zinc-400 text-center">
          {isLogin ? "Ainda não tem conta?" : "Já possui cadastro?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
          >
            {isLogin ? "Cadastre-se agora" : "Faça login"}
          </button>
        </motion.p>
      </motion.div>

      {/* Decorative credit overlay */}
      <div className="absolute bottom-6 text-[10px] font-mono tracking-widest text-zinc-600 select-none pointer-events-none">
        SECURE AUTHENTICATION POWERED BY SUPABASE
      </div>
    </div>
  );
}
