"use client";

import { useState } from "react";
import { X, CirclePlus } from "lucide-react";

export default function NewChild() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [daysPresent, setDaysPresent] = useState([]);
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

    if (!name || !age || daysPresent.length === 0) {
      setError("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: parseInt(age), daysPresent }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout.");

      window.location.href = "/dashboard"; // Redirige vers la liste des enfants après l'ajout
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4">Ajouter un enfant</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg "
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <div>
          <p className="mb-2 font-semibold">Jours de présence :</p>
          <div className="flex gap-2 flex-wrap">
            {allDays.map((day) => (
        <button
        key={day}
        type="button"
        onClick={() => toggleDay(day)}
        className={`px-3 py-2 text-sm font-medium rounded-lg border md:min-w-16 text-center ${
          daysPresent.includes(day) ? "border-2 border-green-500 bg-green-50" : "border-gray-300 bg-gray-200"
        }`}
      >
        {day}
      </button>
      
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50 inline-flex items-center justify-center gap-2"
        >
          <CirclePlus />
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
      </div>
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 inline-flex items-center gap-1"
      >
        <X size={20}/>
        Retour
      </button>
    </div>
  );
}
