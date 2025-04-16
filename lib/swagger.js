import { createSwaggerSpec } from 'next-swagger-doc';

export const getSwaggerSpec = () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Enfants',
                version: '1.0',
            },
        },
    });

    return spec;
};
