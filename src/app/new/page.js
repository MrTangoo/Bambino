"use client";
import ChildForm from "../components/ChildForm";

export default function AddChildPage() {

  const handleAddChild = async (childData) => {
    const res = await fetch('/api/children', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(childData),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de l'ajout de l'enfant");
    }

    window.location.href = "/dashboard";
  };

  return (
      <ChildForm onSubmit={handleAddChild} />
  );
}
