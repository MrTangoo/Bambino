import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllChildren() {
    const children = await prisma.child.findMany();
    return children.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createChild(data) {
    return prisma.child.create({data});
}

export async function updateChild(id, data) {
    return prisma.child.update({where: {id}, data});
}

export async function deleteChild(id) {
    return prisma.child.delete({where: {id}});
}
