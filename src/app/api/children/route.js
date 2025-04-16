import { getAllChildren, createChild, updateChild, deleteChild } from '@lib/children';


export async function GET() {
  try {
    const children = await getAllChildren();
    return new Response(JSON.stringify(children), { status: 200 });
  } catch (error) {
    return new Response('Erreur lors de la récupération des enfants', { status: 500 });
  }
}


export async function POST(request) {
  try {
    const data = await request.json();
    const newChild = await createChild(data);
    return new Response(JSON.stringify(newChild), { status: 201 });
  } catch (error) {
    return new Response('Erreur lors de la création de l\'enfant', { status: 500 });
  }
}

export async function PATCH(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const updateData = await request.json();

  if (!id) {
    return new Response('ID est requis', { status: 400 });
  }

  try {
    const updatedChild = await updateChild(id, updateData);
    return new Response(JSON.stringify(updatedChild), { status: 200 });
  } catch (error) {
    return new Response('Enfant non trouvé', { status: 404 });
  }
}


export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response('ID est requis', { status: 400 });
  }

  try {
    await deleteChild(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Enfant non trouvé', { status: 404 });
  }
}
