import { getSwaggerSpec } from '@lib/swagger';

export async function GET() {
    const spec = getSwaggerSpec();
    return new Response(JSON.stringify(spec), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
}
