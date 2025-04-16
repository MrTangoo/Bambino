"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (session?.user?.role !== "ADMIN") {
            router.push("/");
        }
    }, [session, status, router]);

    if (status === "loading" || session?.user?.role !== "ADMIN") {
        return <div>Chargement...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Espace Admin 👑</h1>
            <p>Bienvenue {session.user?.name}, vous êtes un administrateur.</p>
        </div>
    );
}
