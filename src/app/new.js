"use client";

import { useState } from 'react';

export default function NewChild() {
  // États pour gérer les valeurs des champs du formulaire
  const [name, setName] = useState(''); // Nom de l'enfant
  const [age, setAge] = useState(''); // Âge de l'enfant
  const [daysPresent, setDaysPresent] = useState([]); // Jours de présence de l'enfant

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Envoi des données vers l'API pour ajouter un nouvel enfant
    try {
      await fetch('/api/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age: parseInt(age), daysPresent }), // Conversion de l'âge en nombre entier
      });

      // Rechargement de la page pour afficher l'enfant ajouté
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'enfant:", error); // Gestion d'erreur en cas de problème avec l'API
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Ajouter un enfant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ de saisie pour le nom */}
        <div>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)} // Mise à jour de l'état 'name' à chaque modification
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Champ de saisie pour l'âge */}
        <div>
          <input
            type="number"
            placeholder="Âge"
            value={age}
            onChange={(e) => setAge(e.target.value)} // Mise à jour de l'état 'age' à chaque modification
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Champ de saisie pour les jours de présence */}
        <div>
          <input
            type="text"
            placeholder="Jours de présence (ex : Lundi, Mardi)"
            value={daysPresent.join(', ')} // Affichage des jours sous forme de texte
            onChange={(e) => setDaysPresent(e.target.value.split(',').map((day) => day.trim()))} // Mise à jour de l'état 'daysPresent' à chaque modification
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bouton d'envoi du formulaire */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
