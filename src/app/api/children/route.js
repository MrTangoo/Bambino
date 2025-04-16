import { getAllChildren, createChild, updateChild, deleteChild } from '@lib/children';

/**
 * @swagger
 * /api/children:
 *   get:
 *     summary: Récupérer tous les enfants
 *     description: Retourne une liste triée d'enfants depuis la base de données.
 *     responses:
 *       200:
 *         description: Liste des enfants récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *       500:
 *         description: Erreur serveur lors de la récupération
 */
export async function GET() {
  try {
    const children = await getAllChildren();
    return new Response(JSON.stringify(children), { status: 200 });
  } catch (error) {
    return new Response('Erreur lors de la récupération des enfants', { status: 500 });
  }
}

/**
 * @swagger
 * /api/children:
 *   post:
 *     summary: Créer un nouvel enfant
 *     description: Ajoute un enfant dans la base de données avec nom, âge et jours présents.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewChild'
 *     responses:
 *       201:
 *         description: Enfant créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       500:
 *         description: Erreur serveur lors de la création
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const newChild = await createChild(data);
    return new Response(JSON.stringify(newChild), { status: 201 });
  } catch (error) {
    return new Response('Erreur lors de la création de l\'enfant', { status: 500 });
  }
}

/**
 * @swagger
 * /api/children:
 *   patch:
 *     summary: Mettre à jour un enfant
 *     description: Met à jour les informations d’un enfant existant via son ID passé en query param.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateChild'
 *     responses:
 *       200:
 *         description: Enfant mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       400:
 *         description: ID manquant
 *       404:
 *         description: Enfant non trouvé
 */
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

/**
 * @swagger
 * /api/children:
 *   delete:
 *     summary: Supprimer un enfant
 *     description: Supprime un enfant de la base de données via son ID passé en query param.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Enfant supprimé avec succès (No Content)
 *       400:
 *         description: ID manquant
 *       404:
 *         description: Enfant non trouvé
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         daysPresent:
 *           type: array
 *           items:
 *             type: string
 *     NewChild:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - daysPresent
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         daysPresent:
 *           type: array
 *           items:
 *             type: string
 *     UpdateChild:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: integer
 *         daysPresent:
 *           type: array
 *           items:
 *             type: string
 */