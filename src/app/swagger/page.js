'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage() {
    return <div className="pt-8"><SwaggerUI url="/api/doc" /></div>;
}
