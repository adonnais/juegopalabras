# Módulo de administración

Incluye login de administrador, guardia de rutas, panel principal, gestión de equipos e imágenes Dropbox.

## Requisitos previos

1. Completa `.env.local` con la configuración Firebase.
2. Crea Realtime Database y establece `NEXT_PUBLIC_FIREBASE_DATABASE_URL`.
3. Habilita Email/Password en Firebase Authentication.
4. Crea la cuenta de administrador en Firebase Console.
5. Asigna el custom claim `admin: true` desde un entorno de confianza con Firebase Admin SDK.
6. Publica `database.rules.json` con Firebase CLI.

## Crear custom claim de administrador

No se puede asignar el claim desde el navegador. Desde un entorno privado con Firebase Admin SDK y una cuenta de servicio protegida, ejecuta una vez:

```ts
await getAuth().setCustomUserClaims("UID_DEL_ADMIN", { admin: true });
```

Luego el administrador debe cerrar sesión y volver a entrar para renovar el token.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000/login`.

## Rutas incluidas

- `/login`
- `/admin`
- `/admin/equipos`
- `/admin/imagenes`

## Notas de seguridad y alcance

- El guard del navegador mejora la experiencia, pero la seguridad real depende de las reglas de Realtime Database.
- Las reglas del proyecto autorizan `/game` solo si `auth.token.admin === true`.
- No existe registro público de administradores.
- Los enlaces Dropbox se convierten a `raw=1` cuando se puede; un enlace aceptado sintácticamente no garantiza que Dropbox permita incrustarlo. La vista previa detecta fallos de carga.
- El módulo no implementa todavía las sesiones del juego, cronómetro, puntuación ni clasificación.
