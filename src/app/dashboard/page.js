"use client";

import { useEffect, useState, useCallback } from "react";
import { UserPlus, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import ChildItem from "../components/ChildItem";

export default function Home() {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await fetch("/api/children");
        const data = await res.json();
        setChildren(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChildren();
  }, []);

  const deleteChild = useCallback(async (childId) => {
    const response = await fetch(`/api/children/?id=${childId}`, { method: "DELETE" });
    if (response.ok) {
      setChildren((prev) => prev.filter((child) => child.id !== childId));
    } else {
      alert("Une erreur s'est produite lors de la suppression de l'enfant.");
    }
  }, []);

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    doc.setProperties({
      title: "Liste des enfants",
    });
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(20);
    doc.text("Liste des enfants", 105, 20, { align: "center" });

    let yPosition = 35;

    children.forEach((child, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(33, 37, 41);
      doc.text(`${index + 1}. ${child.name}`, 14, yPosition);

      doc.setFontSize(12);

      doc.setTextColor(60, 60, 60);
      doc.text(`Âge : ${child.age} ans`, 14, yPosition + 6);

      doc.setTextColor(60, 60, 60);
      doc.text(`Présent : `, 14, yPosition + 12);

      doc.setTextColor(0, 128, 0); // vert
      doc.text(`${child.daysPresent.join(", ")}`, 32, yPosition + 12);

      // Ligne de séparation
      doc.setDrawColor(200);
      doc.line(14, yPosition + 18, 195, yPosition + 18);

      yPosition += 28;
    });

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(blobUrl);

    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print();
      };
    } else {
      alert("Veuillez autoriser les pop-ups pour imprimer le PDF.");
    }
  }, [children]);

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 pt-20 sm:pt-6">
        {isLoading ? (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center"
            >
              <svg
                  className="animate-spin h-10 w-10 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
                ></path>
              </svg>
            </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-3xl bg-gray-950 rounded-2xl shadow-xl p-8 space-y-6"
            >
              <h1 className="text-4xl font-bold text-center text-white">📋 Liste des enfants</h1>

              <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {children.map((child) => (
                    <ChildItem key={child.id} child={child} onDelete={deleteChild} />
                ))}
              </ul>

              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-sm text-gray-400"
              >
                Nombre total d&apos;enfants :{" "}
                <span className="text-white font-medium">{children.length}</span>
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/new")}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-3 rounded-xl flex items-center justify-center transition w-full sm:w-auto"
                >
                  <UserPlus className="mr-2" />
                  Ajouter un enfant
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generatePDF}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-xl flex items-center justify-center transition w-full sm:w-auto"
                >
                  <Printer className="mr-2" />
                  Imprimer la liste
                </motion.button>
              </div>
            </motion.div>
        )}
      </div>
  );
}
