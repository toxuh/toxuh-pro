# toxuh.pro

Personal site built with Next.js. The production container serves `toxuh.pro` through an existing Traefik instance.

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Before publishing changes, run `npm run lint` and `npm run build`.

## Docker deployment

The Compose file expects an existing external Docker network named `web`. Traefik must be attached to that network and have the `web` and `websecure` entrypoints and a `letsencrypt` certificate resolver. On a new host, create the network once with `docker network create web`; configure Traefik separately.

From this directory, rebuild and recreate this site's container with:

```bash
docker compose up -d --build
docker compose ps
```

The container exposes port 3000 only to the `web` Docker network. Traefik routes `toxuh.pro` to it and redirects HTTP to HTTPS. The Compose healthcheck requests the home page inside the container. No `.env` file is required. The Dockerfile installs from `package-lock.json` with `npm ci` and runs the minimal standalone Next.js server as a non-root user.

To inspect a failed rollout, use `docker compose logs --tail=100 web`. This command rebuilds only this Compose service; it does not update Traefik or other projects.
