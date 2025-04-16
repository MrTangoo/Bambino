import { describe, it, expect, vi } from 'vitest';
import { GET, POST, PATCH, DELETE } from '@/app/api/children/route';  // Les handlers API
import { getAllChildren, createChild, updateChild, deleteChild } from '@lib/children';  // Fonctions à mocker

// Mock des fonctions getAllChildren, createChild, updateChild, deleteChild
vi.mock('@lib/children', () => ({
    getAllChildren: vi.fn(),
    createChild: vi.fn(),
    updateChild: vi.fn(),
    deleteChild: vi.fn(),
}));

describe('CRUD API /children', () => {

    // Test de récupération des enfants
    it('GET /api/children : doit retourner tous les enfants avec un status 200', async () => {
        // Données simulées pour la réponse GET avec des jours de la semaine
        const mockChildren = [{ name: 'Léo', id: '1', age: 4, daysPresent: ['Lundi', 'Mardi'] }];
        getAllChildren.mockResolvedValue(mockChildren);

        // Appel de la fonction GET
        const res = await GET();
        const data = await res.json();

        // Assertions
        expect(res.status).toBe(200);
        expect(data).toEqual(mockChildren);
        expect(getAllChildren).toHaveBeenCalledOnce();
    });

    // Test de création d'un enfant
    it('POST /api/children : doit créer un enfant avec un status 201', async () => {
        // Données simulées pour le POST avec des jours de la semaine
        const newChild = { name: 'Bob', age: 5, daysPresent: ['Lundi', 'Mercredi'] };
        const mockCreatedChild = { ...newChild, id: '2' };
        createChild.mockResolvedValue(mockCreatedChild);

        // Création de la requête POST simulée
        const res = await POST({ json: () => newChild });

        const data = await res.json();

        // Assertions
        expect(res.status).toBe(201);
        expect(data).toEqual(mockCreatedChild);
        expect(createChild).toHaveBeenCalledWith(newChild);
    });

    // Test de mise à jour d'un enfant
    it('PATCH /api/children : doit mettre à jour un enfant avec un status 200', async () => {
        // Données simulées pour le PATCH avec des jours de la semaine
        const updateData = { name: 'Léo', age: 5, daysPresent: ['Lundi', 'Jeudi'] };
        const mockUpdatedChild = { id: '1', ...updateData };
        updateChild.mockResolvedValue(mockUpdatedChild);

        // Création de la requête PATCH simulée
        const res = await PATCH({ json: () => updateData, url: 'http://localhost/?id=1' });

        const data = await res.json();

        // Assertions
        expect(res.status).toBe(200);
        expect(data).toEqual(mockUpdatedChild);
        expect(updateChild).toHaveBeenCalledWith('1', updateData);
    });

    // Test de suppression d'un enfant
    it('DELETE /api/children : doit supprimer un enfant avec un status 204', async () => {
        // Données simulées pour la suppression
        const idToDelete = '1';
        deleteChild.mockResolvedValue(true);

        // Création de la requête DELETE simulée
        const res = await DELETE({ url: `http://localhost/?id=${idToDelete}` });

        // Assertions
        expect(res.status).toBe(204);
        expect(deleteChild).toHaveBeenCalledWith(idToDelete);
    });

    // Test du cas où l'ID est manquant pour PATCH
    it('PATCH /api/children : retourne un status 400 si l\'ID est manquant', async () => {
        const updateData = { name: 'Léo', age: 5, daysPresent: ['Lundi'] };
        const res = await PATCH({ json: () => updateData, url: 'http://localhost' });

        expect(res.status).toBe(400);
        expect(await res.text()).toBe('ID est requis');
    });

    // Test du cas où l'ID est manquant pour DELETE
    it('DELETE /api/children : retourne un status 400 si l\'ID est manquant', async () => {
        const res = await DELETE({ url: 'http://localhost' });

        expect(res.status).toBe(400);
        expect(await res.text()).toBe('ID est requis');
    });
});
