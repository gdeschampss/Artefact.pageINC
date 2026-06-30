"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Easing/Spring settings following design guidelines (Jakub & Emil weighting)
  const buttonSpring = {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 1,
  };

  const textTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // Custom Bézier curve for premium natural feel
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-end px-6 md:px-20 lg:px-32 z-10">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for readability */}
        <video
          src="/video/background.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-2xl flex flex-col items-end text-right gap-8 mt-16 md:mt-24">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={textTransition}
          className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-[1.2] text-white tracking-wide"
        >
          O QUANTO PODEMOS <br />
          <span className="font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.2)]">
            AUTOMATIZAR
          </span>{" "}
          <br />
          SEU TRABALHO?
        </motion.h1>

        {/* Animated Call-to-Action (CTA) Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...textTransition, delay: 0.15 }}
        >
          <Link href="/marketplace" className="no-underline block">
            <motion.button
              // Interactive tactile scale and spring animations
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={buttonSpring}
              className="flex items-center gap-3 px-8 py-5 bg-black border border-white/10 hover:border-white/30 text-white font-bold text-lg rounded-2xl cursor-pointer shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <span className="tracking-wider">DESCUBRA MAIS</span>
              
              {/* Arrow micro-interaction: slides out slightly to the right on hover */}
              <motion.div
                variants={{
                  initial: { x: 0 },
                  hover: { x: 5 }
                }}
                initial="initial"
                whileHover="hover"
                className="flex items-center justify-center"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowRight size={22} className="text-white group-hover:text-indigo-300 transition-colors duration-200" />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Left Overlay for premium minimalist look */}
      <div className="absolute bottom-10 left-6 md:left-20 z-20 hidden sm:block select-none pointer-events-none">
        <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          ARTEFACT.co © 2026 // SaaS Automations & Prompts
        </p>
      </div>
    </section>
  );
}
