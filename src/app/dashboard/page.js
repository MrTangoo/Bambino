"use client";

import { useEffect, useState } from "react";
import { Trash2, SquarePen, UserPlus, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf'; 

export default function Home() {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/children")
      .then((res) => res.json())
      .then((data) => {
        setChildren(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const deleteChild = async (childId) => {
    const response = await fetch(`/api/children/?id=${childId}`, { method: "DELETE" });
    if (response.ok) setChildren(children.filter((child) => child.id !== childId));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
  
    doc.text('Liste des enfants', 14, 16);
  
    let yPosition = 30;
    children.forEach((child) => {
      doc.text(`${child.name}`, 14, yPosition);
      doc.text(`Âge: ${child.age} ans`, 14, yPosition + 6);
      doc.text(`Présent: ${child.daysPresent.join(', ')}`, 14, yPosition + 12);
      yPosition += 30;
    });
  
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(blobUrl);

    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print(); 
      };
    } else {
      alert("Veuillez autoriser les pop-ups pour imprimer le PDF.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Liste des enfants</h1>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg max-h-140 overflow-y-auto">
          {children.map((child) => (
            <li key={child.id} className="flex justify-between items-center p-3 border-b">
              <div>
                <p className="font-semibold">{child.name} ({child.age} ans)</p>
                <p className="text-sm text-gray-600">Présent: {child.daysPresent.join(", ")}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-yellow-500 hover:text-yellow-600">
                  <SquarePen size={20} />
                </button>
                <button onClick={() => deleteChild(child.id)} className="text-red-500 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
      <p className="text-sm text-gray-500">Nombre total d&apos;enfants: {children.length}</p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center  max-w-lg">
        <button
          onClick={() => router.push("/new")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 inline-flex items-center w-full sm:w-auto justify-center"
        >
          <UserPlus className="mr-2" />
          Ajouter un enfant
        </button>
        <button 
          onClick={generatePDF} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-flex items-center w-full sm:w-auto justify-center"
        >
          <Printer className="mr-2" />
          Imprimer la liste
        </button>
      </div>
    </div>
  );
}