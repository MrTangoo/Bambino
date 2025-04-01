import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Requête GET pour récupérer tous les enfants
export async function GET() {
  try {
    // Récupérer tous les enfants depuis la base de données
    const children = await prisma.child.findMany();
    // Retourner une réponse avec le statut 200 et la liste des enfants au format JSON
    return new Response(JSON.stringify(children), { status: 200 });
  } catch (error) {
    // En cas d'erreur pendant la récupération, retourner le statut 500 avec un message d'erreur
    return new Response('Erreur lors de la récupération des enfants', { status: 500 });
  }
}

// Requête POST pour créer un nouvel enfant
export async function POST(request) {
  const { name, age, daysPresent } = await request.json();
  
  try {
    // Créer un nouvel enfant dans la base de données
    const newChild = await prisma.child.create({
      data: { name, age, daysPresent },
    });
    // Retourner une réponse avec le statut 201 (Créé) et les données du nouvel enfant
    return new Response(JSON.stringify(newChild), { status: 201 });
  } catch (error) {
    // En cas d'erreur, retourner une réponse avec le statut 500
    return new Response('Erreur lors de la création de l\'enfant', { status: 500 });
  }
}

// Requête PATCH pour mettre à jour un enfant
export async function PATCH(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id'); // Récupérer l'ID depuis la query string
  const updateData = await request.json();

  if (!id) {
    // Si l'ID est manquant, retourner une réponse avec le statut 400 (Bad Request)
    return new Response('ID est requis', { status: 400 });
  }

  try {
    // Mettre à jour l'enfant avec l'ID fourni dans la base de données
    const updatedChild = await prisma.child.update({
      where: { id },
      data: updateData,
    });
    // Retourner une réponse avec le statut 200 et les données de l'enfant mis à jour
    return new Response(JSON.stringify(updatedChild), { status: 200 });
  } catch (error) {
    // Si l'enfant n'est pas trouvé, retourner une réponse avec le statut 404
    return new Response('Enfant non trouvé', { status: 404 });
  }
}

// Requête DELETE pour supprimer un enfant
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id'); // Récupérer l'ID depuis la query string

  if (!id) {
    // Si l'ID est manquant, retourner une réponse avec le statut 400 (Bad Request)
    return new Response('ID est requis', { status: 400 });
  }

  try {
    // Supprimer l'enfant avec l'ID fourni dans la base de données
    await prisma.child.delete({ where: { id } });
    // Retourner une réponse avec le statut 204 (No Content) après la suppression
    return new Response(null, { status: 204 });
  } catch (error) {
    // Si l'enfant n'est pas trouvé, retourner une réponse avec le statut 404
    return new Response('Enfant non trouvé', { status: 404 });
  }
}
