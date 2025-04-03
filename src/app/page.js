"use client";
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center h-screen px-4">
        {/* Animation pour le titre */}
        <motion.h1 
          className="text-5xl md:text-9xl font-bold mt-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Bienvenue sur
          <span> Bambino</span>

          {/* Animation du "+" avec effet de rotation et de pop */}
          <motion.span 
            className="bg-gradient-to-br from-green-400 to-blue-600 text-transparent bg-clip-text"  
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: 1.1 }}
            whileHover={{ scale: 1.1 }}
          >
            +
          </motion.span>
        </motion.h1>

        {/* Animation pour la description */}
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-600 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          La solution de gestion des enfants pour les crèches et les garderies.
        </motion.p>

        <div className="mt-8 md:mt-12 flex flex-col items-center">
          {/* Animation pour le bouton */}
          <motion.a 
            href="/login" 
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: 1.4 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-lg text-white relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-transparent group-hover:text-white group-hover:dark:bg-transparent">
              Se connecter
            </span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
