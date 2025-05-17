<p align="center">
  <img src="https://github.com/KevinKeyssx/SpaceSafes-Back/assets/your-asset-id/logo.png" width="200" alt="SpaceSafes Logo" />
</p>

<h1 align="center">SpaceSafes</h1>

<p align="center">
  <a href="https://clerk.com" target="_blank"><img src="https://img.shields.io/badge/Authentication-Clerk-6C47FF" alt="Clerk" /></a>
  <a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/Framework-NestJS-ea2845" alt="NestJS" /></a>
  <a href="https://www.prisma.io" target="_blank"><img src="https://img.shields.io/badge/ORM-Prisma-2D3748" alt="Prisma" /></a>
  <a href="https://swagger.io" target="_blank"><img src="https://img.shields.io/badge/API_Docs-Swagger-85EA2D" alt="Swagger" /></a>
</p>

## 🚀 Descripción

SpaceSafes es una plataforma innovadora desarrollada para la Hackathon de Clerk que permite a los usuarios gestionar de forma segura sus cuentas, contraseñas y servicios web. La aplicación proporciona un espacio centralizado para almacenar credenciales de forma segura, gestionar suscripciones y monitorear balances financieros asociados a diferentes servicios web y personales.

## ✨ Características Principales

- **Gestión de Cuentas**: Almacenamiento seguro de credenciales para diferentes servicios web
- **Navegación Web (Navly)**: Sistema para organizar y acceder a sitios web favoritos con metadatos enriquecidos
- **Gestión de Balances**: Control de saldos y pagos asociados a diferentes servicios

## 🔒 Integración con Clerk

SpaceSafes utiliza Clerk como sistema principal de autenticación y gestión de usuarios, aprovechando sus potentes características:

### Implementación del Guard de Clerk

Uno de los componentes clave de nuestra integración es el `ClerkGuard`, un guard personalizado que protege todas las rutas de la API:

```typescript
// src/common/guards/clerk.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Clerk } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkGuard implements CanActivate {
  private clerk: Clerk;

  constructor(private configService: ConfigService) {
    this.clerk = new Clerk({
      secretKey: this.configService.get<string>('CLERK_SECRET_KEY'),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No authorization token provided');
    }
    
    try {
      // Verificar el token con Clerk
      const session = await this.clerk.verifyToken(token);
      request.user = session;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

Este guard se aplica globalmente en nuestra aplicación:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClerkGuard } from './common/guards/clerk.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )
  .useGlobalGuards(
    new ClerkGuard()
  )
  .setGlobalPrefix('api/v1')
  .enableCors({
    origin: ['http://localhost:3017', 'http://localhost:4321', 'https://space-safes.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

### Beneficios de Clerk en SpaceSafes

- **Autenticación Segura**: Implementación robusta de JWT con rotación de tokens
- **Verificación de Identidad**: Validación de usuarios mediante diversos métodos
- **Integración con Frontend**: Compatibilidad perfecta con nuestro frontend en Astro
- **Protección de Endpoints**: Todas las rutas están protegidas automáticamente
- **Gestión de Sesiones**: Control eficiente de sesiones de usuario

## 🛠️ Tecnologías Utilizadas

- **Backend**: NestJS (Framework de Node.js basado en TypeScript)
- **Base de Datos**: PostgreSQL con Prisma como ORM
- **Autenticación**: Clerk para gestión de usuarios y sesiones
- **Validación**: Class-validator y Zod para validación de datos
- **Documentación API**: Swagger UI integrado
- **Extracción de Metadatos**: Open Graph Scraper para enriquecer datos de URLs
- **Gestión de Dependencias**: PNPM como gestor de paquetes

## 📦 Estructura del Proyecto

```
src/
├── accounts/         # Módulo de gestión de cuentas
├── balances/         # Módulo de gestión de balances financieros
├── common/           # Utilidades, DTOs y configuraciones compartidas
│   ├── config/       # Configuración de variables de entorno con Zod
│   ├── dtos/         # Data Transfer Objects compartidos
│   ├── error/        # Manejo centralizado de errores
│   └── guards/       # Guards de autenticación (ClerkGuard)
├── navly/            # Módulo de navegación y gestión de sitios web
├── notes/            # Módulo de notas seguras
├── payments/         # Módulo de gestión de pagos
└── main.ts           # Punto de entrada de la aplicación
```

## 🚀 Instalación y Ejecución

```bash
# Instalación de dependencias
$ pnpm install

# Configuración de variables de entorno
$ cp .env.example .env
# Editar .env con tus credenciales de Clerk y configuración de base de datos

# Ejecución en modo desarrollo
$ pnpm run start:dev

# Ejecución en modo producción
$ pnpm run start:prod
```

## 📝 Documentación API

Una vez iniciada la aplicación, puedes acceder a la documentación interactiva de la API en:

```
http://localhost:3000/api/docs
```

## 🧪 Pruebas

```bash
# Pruebas unitarias
$ pnpm run test

# Pruebas e2e
$ pnpm run test:e2e

# Cobertura de pruebas
$ pnpm run test:cov
```

## 👥 Equipo

Desarrollado para la Hackathon de Clerk por:

- [Tu Nombre](https://github.com/KevinKeyssx)
- [Otros miembros del equipo]

## 📄 Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
