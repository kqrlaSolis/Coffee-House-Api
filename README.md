# Coffee House API

Backend del sistema Coffee House. Es una API que maneja usuarios, productos, categorías y órdenes.

---

## Requisitos

- **Docker Desktop** instalado en tu computadora
  - [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Una vez instalado, abrí Docker Desktop y esperá a que aparezca "Engine running"
- **Git** instalado
  - [Descargar Git](https://git-scm.com/downloads)
- Una base de datos **MySQL** accesible (puede ser local o en la nube)

---

## Pasos para levantar el proyecto

### 1. Clonar el repositorio

Abrí una terminal (PowerShell, CMD, o Git Bash) y ejecutá:

```bash
git clone https://github.com/kqrlaSolis/Coffee-House-Api.git
cd Coffee-House-Api
```

### 2. Crear el archivo `.env`

Dentro de la carpeta `Coffee-House-Api`, creá un archivo llamado `.env` y pegá esto:

```
DATABASE_URL="mysql://usuario:contraseña@host:puerto/coffee_house"
APP_SECRET=uns密密omuyseguroquenadi VA a adivinar1234567890abcdef1234567890abcdef
```

Reemplazá los valores con los de tu base de datos:

| Variable | Qué va ahí | Ejemplo |
|---|---|---|
| `usuario` | Usuario de MySQL | `root` |
| `contraseña` | Contraseña de MySQL | `miClave2024` |
| `host` | Dirección de la base de datos | `localhost` o `192.168.1.50` |
| `puerto` | Puerto de MySQL | `3306` |
| `APP_SECRET` | Texto secreto largo (mínimo 32 caracteres) | cualquier texto al azar |

> ⚠️ **Importante**: No le compartas este archivo a nadie. Contiene las credenciales de la base de datos.

### 3. Levantar la API

En la terminal, ejecutá:

```bash
docker compose up --build
```

La primera vez va a tardar un rato (descarga imágenes, instala dependencias, compila el código). Después de eso, vas a ver algo como:

```
api-1  | Prisma Migrate deployed
api-1  | Server running on port 3000
```

### 4. Verificar que funciona

Abrí el navegador e ingresá a:

```
http://localhost:3000/health
```

Si ves `{ "status": "ok" }` (o algo similar sin errores), todo está funcionando.

---

## Comandos útiles

| Acción | Comando |
|---|---|
| Iniciar la API | `docker compose up` |
| Iniciar y reconstruir | `docker compose up --build` |
| Ver logs en vivo | `docker compose logs -f` |
| Detener la API | `docker compose down` |
| Actualizar (después de un `git pull`) | `docker compose up --build -d` |
| Ver contenedores activos | `docker ps` |

---

## Problemas comunes

### Puerto 3000 ya está en uso
Cambiá el puerto en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"
```

Luego accedé a `http://localhost:3001/health`

### La base de datos no conecta
- Verificá que MySQL esté corriendo
- Verificá que los datos en `.env` sean correctos
- Si MySQL está en tu misma máquina, el `host` tiene que ser `host.docker.internal` en vez de `localhost`

### Error de migraciones
Ejecutá manualmente:

```bash
docker compose run --rm api npx prisma migrate deploy
```

### Otros errores
- Asegurate de tener Docker Desktop abierto y corriendo
- Si cambiás el contenido del `.env`, tenés que reiniciar: `docker compose down && docker compose up --build`
