import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# WordPress Docker Stack

WordPress and MySQL as a two-service Docker Compose stack that starts with a single
command — no PHP, no Apache and no database installed on the host. Built to practise
the parts of Compose that decide whether a stack is merely running or actually
working: required variables, healthchecks, named volumes and a network that exposes
only what has to be reachable.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/dso-wordpress"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

```bash
cp example.env .env     # set DB_USER and DB_PASSWORD
docker compose up -d
```

WordPress then answers at `http://localhost:8080` and runs its installation wizard
on first access. The host port is configurable through `WP_PORT`.

```bash
docker compose down     # containers are removed, the data stays
```

## Description

### Only one service faces the host

Both containers share a user-defined bridge network, `wp_net`, on which Docker
resolves service names via DNS. WordPress therefore reaches the database as `db`
instead of by IP address, which keeps the configuration portable.

The `db` service publishes **no** port. It is reachable from inside the network and
from nowhere else. That is the cheapest security measure in the whole stack: a
service with no route from outside needs no firewall rule, no rate limit and no
authentication hardening against the internet, because the internet cannot address
it.

### Required variables instead of convenient defaults

Non-sensitive settings such as the port and the database name live in
`docker-compose.yaml` and have defaults. The credentials do not:

```yaml
MYSQL_USER: ${DB_USER:?DB_USER is required in .env}
```

The `:?` form makes Compose abort with an explicit message when the variable is
missing **or empty**. A default password would have been one line shorter and would
have shipped a known credential to every installation — a backdoor with
documentation. Failing to start is the correct behaviour here.

The MySQL root account uses `MYSQL_RANDOM_ROOT_PASSWORD`, so a random password is
generated on first startup, printed once to the log and then forgotten. The
application itself connects as `DB_USER`, which has access to exactly one database.
Nothing in normal operation needs root, so nothing keeps a root password around.

### Running is not the same as ready

On first startup MySQL initialises its data directory before it accepts a single
connection. A WordPress container started at the same moment fails, because the
database is up but not yet listening.

`depends_on` alone does not help — on its own it waits for the container to start,
not for the service to work. The database therefore defines a healthcheck and
WordPress waits for its result:

```yaml
depends_on:
  db:
    condition: service_healthy
```

Compose holds WordPress back until `mysqladmin ping` succeeds inside the database
container. Worth remembering: `condition: service_healthy` requires the referenced
service to actually define a healthcheck, otherwise Compose refuses to start.

### State lives in volumes, not in containers

| Volume | Mounted at | Contains |
| --- | --- | --- |
| `db` | `/var/lib/mysql` | Posts, pages, users, settings |
| `wordpress` | `/var/www/html` | Core, themes, plugins, uploads |

Because the data sits in named volumes rather than in the containers' writable
layer, `docker compose down` followed by `up -d` returns the site unchanged.
`docker compose down -v` removes the volumes as well and deletes everything — which
is exactly why the two commands deserve to be told apart before they are typed.

### Restart on failure, not on everything

Both services use `restart: on-failure`. Docker restarts a container whose main
process exits with a non-zero status. It reacts to the *exit code*, not to the
container stopping as such, so a container shut down cleanly or stopped by hand
stays stopped — `restart: always` would fight the operator instead of the fault.

## Key Takeaways

- **A default password is a backdoor with documentation.** `${VAR:?message}` turns a
  missing secret into a startup error instead of a shipped credential.
- **Publish only the port that has to be reachable.** The database needs no route
  from outside, so it gets none.
- **`depends_on` waits for the container; a healthcheck waits for the service.** The
  difference only shows up on the very first start, which is the one you test least.
- **Credentials initialise the database once.** Editing `.env` afterwards changes
  nothing — a leaked credential needs a volume reset, not a text edit.
- **Pin image tags in the repository, not in `.env`.** Which version runs is a
  reviewed decision, not a local preference.

## Further References

- [Docker Compose `depends_on` reference](https://docs.docker.com/reference/compose-file/services/#depends_on)
- [WordPress image on Docker Hub](https://hub.docker.com/_/wordpress)
- [Supported PHP versions](https://www.php.net/supported-versions.php)
