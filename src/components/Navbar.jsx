"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight, Compass, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuTransition = shouldReduceMotion
    ? { duration: 0.1 }
    : { type: "spring", stiffness: 380, damping: 30 };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl glassmorphism">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <Image
            src="/icons/galaxy.png"
            alt="Galaxy Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span 
            className="text-xl tracking-[0.2em] font-extralight text-white font-mono"
            style={{ fontFamily: "'Trebuchet MS', Arial, sans-serif" }}
          >
            ARTEFACT
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/marketplace"
            className="text-xs font-light text-zinc-300 hover:text-white transition-colors duration-250 flex items-center gap-1.5"
          >
            <Compass size={13} />
            Marketplace
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth"
            className="text-xs font-light text-zinc-300 hover:text-white transition-colors duration-250"
          >
            Entrar
          </Link>
          <motion.a
            href="/auth"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="text-xs font-medium px-3.5 py-1.5 bg-white text-black rounded-lg hover:bg-zinc-100 transition-colors duration-200 flex items-center gap-1.5 group"
          >
            Cadastrar
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={menuTransition}
            className="md:hidden mt-2 p-6 rounded-2xl glassmorphism flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4">
              <Link
                href="/marketplace"
                onClick={toggleMenu}
                className="text-sm font-light text-zinc-300 hover:text-white transition-colors py-2 flex items-center gap-2"
              >
                <Compass size={16} />
                Marketplace
              </Link>
            </nav>
            <div className="h-px bg-zinc-800" />
            <div className="flex flex-col gap-4">
              <Link
                href="/auth"
                onClick={toggleMenu}
                className="text-sm font-light text-zinc-300 hover:text-white text-center py-2"
              >
                Entrar
              </Link>
              <Link
                href="/auth"
                onClick={toggleMenu}
                className="text-sm font-medium px-3.5 py-2.5 bg-white text-black rounded-lg hover:bg-zinc-100 text-center flex items-center justify-center gap-1.5"
              >
                Cadastrar
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
