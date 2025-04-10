"use client";

import { useState } from "react";
import { X, CirclePlus } from "lucide-react";
import { motion } from "framer-motion";

export default function ChildForm({ onSubmit, initialData = {} }) {
    const [name, setName] = useState(initialData.name || "");
    const [age, setAge] = useState(initialData.age || "");
    const [daysPresent, setDaysPresent] = useState(initialData.daysPresent || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const allDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

    const toggleDay = (day) => {
        setDaysPresent((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const ageValue = parseInt(age);
        if (!name || !age || daysPresent.length === 0) {
            setError("Tous les champs sont obligatoires.");
            setLoading(false);
            return;
        }

        if (ageValue <= 0) {
            setError("L'âge doit être un nombre positif.");
            setLoading(false);
            return;
        }

        try {
            await onSubmit({ name, age: ageValue, daysPresent });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 text-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-white">
                    {initialData.id ? "Modifier l'enfant" : "Ajouter un enfant"}
                </h2>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-center font-medium"
                    >
                        {error}
                    </motion.p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
                        whileFocus={{ scale: 1.02 }}
                    />

                    <motion.input
                        type="number"
                        placeholder="Age"
                        min="1"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
                        whileFocus={{ scale: 1.02 }}
                    />

                    <div>
                        <p className="font-semibold mb-2 text-gray-200">Jours de présence :</p>
                        <div className="flex flex-wrap gap-1.75">
                            {allDays.map((day) => (
                                <motion.button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${daysPresent.includes(day)
                                        ? "border-green-500 border-2 text-white"
                                        : "border-2 border-gray-700 bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {day}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <CirclePlus size={20} />
                        {loading ? (initialData.id ? "Modification en cours..." : "Ajout en cours...") : initialData.id ? "Modifier" : "Ajouter"}
                    </motion.button>
                </form>

                <motion.button
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.05 }}
                    className="w-full text-gray-300 flex justify-center items-center gap-2 mt-4 hover:text-red-500 hover:animate-pulse transition-colors duration-200"
                >
                    <X size={18} />
                    Retour
                </motion.button>
            </motion.div>
        </div>
    );
}
