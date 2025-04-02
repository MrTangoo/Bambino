"use client";

import { useEffect, useState } from 'react';
import { Trash2, SquarePen, Printer } from 'lucide-react'; // Import des icônes de poubelle, crayon et imprimante
import NewChild from './new'; // Composant pour ajouter un enfant
import { useRouter } from 'next/navigation'; // Hook pour la navigation
import jsPDF from 'jspdf'; // Librairie pour générer des PDF

export default function Home() {
  // États pour gérer les enfants et l'état de chargement
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  // Effet pour récupérer les données des enfants à l'initialisation du composant
  useEffect(() => {
    fetch('/api/children')
      .then((res) => res.json())
      .then((data) => {
        setChildren(data);
        setIsLoading(false); // Désactive l'état de chargement une fois les données récupérées
      })
      .catch((error) => {
        console.error("Erreur de chargement des enfants:", error);
        setIsLoading(false); // Arrêt du chargement en cas d'erreur
      });
  }, []);

  // Fonction pour supprimer un enfant
  const deleteChild = async (childId) => {
    try {
      const response = await fetch(`/api/children/?id=${childId}`, { method: 'DELETE' });

      if (response.ok) {
        // Filtrer la liste des enfants pour retirer celui supprimé
        setChildren((prevChildren) => prevChildren.filter((child) => child.id !== childId));
      } else {
        console.error("Erreur lors de la suppression de l'enfant");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Fonction pour générer et afficher le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
  
    // Titre du document
    doc.text('Liste des enfants', 14, 16);
  
    // Parcours des enfants pour ajouter leurs informations au PDF
    let yPosition = 30;
    children.forEach((child) => {
      doc.text(`${child.name}`, 14, yPosition);
      doc.text(`Âge: ${child.age} ans`, 14, yPosition + 6);
      doc.text(`Présent: ${child.daysPresent.join(', ')}`, 14, yPosition + 12);
      yPosition += 30; // Espace entre les enfants
    });
  
    // Conversion en Blob et ouverture dans un nouvel onglet pour l'impression
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(blobUrl);

    // Si la fenêtre est ouverte, lancer l'impression
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print(); 
      };
    } else {
      alert("Veuillez autoriser les pop-ups pour imprimer le PDF.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row p-6 bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900">
      {/* Section principale de la liste des enfants */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-xl overflow-hidden h-fit md:mr-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 md:mb-8">Liste des enfants</h1>
        <div className="bg-white p-6 rounded-lg mb-8 md:max-h-[80vh] max-h-[44vh] overflow-y-auto">
          {/* Affichage de l'état de chargement ou des enfants */}
          {isLoading ? (
            <div role="status" className='flex justify-center items-center h-full'>
              <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ul className="space-y-6">
              {/* Liste des enfants */}
              {children.map((child) => (
                <li
                  key={child.id}
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-xl shadow-md hover:bg-blue-100 transition duration-300"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl text-gray-800">{child.name}</span>
                    <span className="text-sm text-gray-600"><span className='font-semibold'>Âge:</span> {child.age} ans</span>
                    <span className="text-sm text-gray-600"><span className='font-bold'>Présent:</span> {child.daysPresent.join(', ')}</span>
                  </div>
                  <div className='flex space-x-2'>
                    <button className="text-gray-500 pt-0.5 hover:text-yellow-500 transition duration-200">
                      <SquarePen size={24} />
                    </button>
                    <button onClick={() => deleteChild(child.id)} className="text-gray-500 hover:text-red-600 transition duration-200">
                      <Trash2 size={24} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Section pour ajouter un enfant et générer le PDF */}
      <div className="flex-none w-full md:w-1/3 mt-8 md:mt-0">
        <NewChild />
        <div className='flex justify-center mt-4'>
          <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 inline-flex items-center">
            <Printer size={24} className='mr-2' /> Imprimer la liste
          </button>
        </div>
      </div>
    </div>
  );
}
