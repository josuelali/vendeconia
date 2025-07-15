# VendeConIA - Generador de Tiendas Virales con IA

## Resumen del proyecto
VendeConIA es una aplicación web que ayuda a emprendedores a crear tiendas online exitosas utilizando inteligencia artificial. La plataforma automatiza la generación de ideas de productos virales, creación de contenido promocional y análisis de mercado.

## Arquitectura del proyecto
- **Frontend**: React con TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js con Express, TypeScript
- **Base de datos**: PostgreSQL con Drizzle ORM (memoria para desarrollo)
- **IA**: OpenAI API (GPT-4o) para generación de contenido
- **Routing**: Wouter para navegación del cliente

## Características principales
- Generador de productos virales con análisis de tendencias
- Creador de contenido promocional (videos, textos, gráficos)
- Interfaz intuitiva con vista previa en tiempo real
- Integración planificada con Shopify e Instagram
- Sistema de precios freemium

## Estructura de archivos
```
client/
├── src/
│   ├── components/
│   │   ├── home/ (página principal)
│   │   ├── product-generator/ (generador de productos)
│   │   ├── content-generator/ (generador de contenido)
│   │   └── layout/ (navegación y footer)
│   ├── pages/ (rutas principales)
│   └── lib/ (utilidades y configuración)
server/
├── lib/openai.ts (integración con OpenAI)
├── routes.ts (API endpoints)
└── storage.ts (almacenamiento en memoria)
shared/
└── schema.ts (tipos de datos compartidos)
```

## Estado actual
✅ Aplicación base funcionando
✅ Generador de productos con OpenAI
✅ Generador de contenido con vista previa
✅ Diseño responsive y profesional
✅ Integración con API de OpenAI configurada

## Próximos desarrollos sugeridos
1. Sistema de autenticación de usuarios
2. Integración con Shopify API
3. Publicación automática en Instagram
4. Sistema de pagos (Stripe)
5. Análisis de rendimiento y métricas
6. Marketplace de plantillas

## Configuración
- Requiere OPENAI_API_KEY para funcionar
- Puerto 5000 para desarrollo
- Fuentes: Inter (texto), Poppins (encabezados)

## Cambios recientes
- 2025-01-15: Solucionado error de configuración de Tailwind CSS para fuentes
- 2025-01-15: Aplicación base completada con todas las características principales
- 2025-01-15: Integración exitosa con OpenAI API

## Preferencias del usuario
- Comunicación en español
- Enfoque en monetización y estrategia de negocio
- Interés en el modelo VendeConIA (productos virales + IA)