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
✅ Sistema de autenticación con Replit Auth implementado
✅ Base de datos PostgreSQL configurada y poblada
✅ Todas las funcionalidades de monetización implementadas
✅ Navbar actualizada con navegación para usuarios autenticados
✅ Datos de ejemplo insertados (planes, productos, plantillas, consultoría)

## Funcionalidades implementadas
- **Autenticación**: Login/logout con Replit Auth
- **Planes de suscripción**: Free (€0), Premium (€7), Enterprise (€19)
- **Marketplace de plantillas**: 5 plantillas categorizadas
- **Servicios de consultoría**: 5 servicios especializados
- **Productos de ejemplo**: 6 productos con diferentes categorías
- **Dashboard**: Panel para usuarios autenticados
- **Precios**: Página de suscripciones y pagos

## Próximos desarrollos sugeridos
1. Integración con Shopify API
2. Publicación automática en Instagram
3. Sistema de pagos Stripe completo
4. Panel de afiliados
5. Análisis de rendimiento y métricas
6. Notificaciones y alertas

## Configuración
- Requiere OPENAI_API_KEY para funcionar
- Base de datos PostgreSQL configurada
- Puerto 5000 para desarrollo
- Fuentes: Inter (texto), Poppins (encabezados)

## Cambios recientes
- 2025-07-15: Navbar actualizada con sistema de autenticación completo
- 2025-07-15: Base de datos poblada con datos de ejemplo
- 2025-07-15: Todas las funcionalidades de monetización implementadas
- 2025-07-15: Sistema de autenticación Replit Auth funcionando
- 2025-07-15: Transición completa de MemStorage a DatabaseStorage

## Preferencias del usuario
- Comunicación en español
- Enfoque en monetización y estrategia de negocio
- Interés en el modelo VendeConIA (productos virales + IA)