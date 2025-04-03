"use client";
import { signOut, useSession } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-gray-100 flex justify-between fixed top-0 left-0 right-0 shadow-md">
      <h1 className="text-xl font-bold">Bambino+</h1>
      {session ? (
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 inline-flex items-center gap-1">
         <LogOut />
          Déconnexion
        </button>
      ) : (
        <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-flex items-center gap-1">
            <LogIn/>
            Se connecter</a>
      )}
    </nav>
  );
}
