"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="p-4 bg-gray-900 flex justify-between fixed top-0 left-0 right-0 shadow-md text-white">
      {/* Logo ou nom du site */}
      <Link href="/" className="text-xl font-bold">BAMBINO+</Link>
      
      {/* Affichage conditionnel du bouton connexion/déconnexion */}
      {status === "loading" ? null : session ? (
        <button 
          onClick={() => signOut()} 
          className="bg-gray-900 rounded-lg inline-flex items-center gap-1 hover:text-red-500 hover:animate-pulse"
        >
          <LogOut />
          Déconnexion
        </button>
      ) : (
        <Link 
          href="/login" 
          className="bg-gray-900 font-bold text-white rounded-lg hover:animate-pulse inline-flex items-center gap-1"
        >
          <LogIn />
          Se connecter
        </Link>
      )}
    </nav>
  );
}
