import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# Truck Signs API

A Django REST Framework backend for an online store, packaged as a Docker Compose
stack with gunicorn and PostgreSQL. The application already existed; the work was
to make it start, configure and test itself without anyone typing commands into a
running container.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/dso-truck-signs-api-v2"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

```bash
cp example.env .env     # fill in the required values
docker compose up -d
```

The API answers on port `8020`, the Django admin at `/admin/`. The first start
builds the image, initialises the database, applies all migrations and creates the
superuser.

## Description

### A stack that brings itself up

`entrypoint.sh` does what a human would otherwise do on first boot. It waits for
PostgreSQL by attempting a real connection in a loop rather than sleeping a fixed
number of seconds, applies the migrations, collects the static files and creates
the superuser if it does not exist yet. It refuses to continue when the superuser
password is empty, so a misconfigured deployment fails loudly instead of creating
an account nobody can account for.

Everything configurable arrives as an environment variable. `example.env` lists
every one of them and says which are required; the real `.env` is not in the
repository.

### Continuous integration

Three workflows run in GitHub Actions:

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `test.yaml` | pushes and pull requests touching `**/*.py` or `requirements.txt` | `flake8`, `black --check`, `isort --check-only`, then the Django test suite |
| `build.yaml` | git tags and manual dispatch | builds the image with Buildx and pushes it to GHCR |
| `check-open-pr.yaml` | pushes outside `main` | fails while the branch has no open pull request |

The path filter on `test.yaml` was a deliberate choice: a change to the Dockerfile
or the README does not start a Python test run. Its side effect is worth knowing —
a workflow that does not run is not reported as skipped either, so the pull request
simply shows one check fewer.

## Key Takeaways

- **Wait for a service, do not sleep for it.** A connection attempt in a loop is
  correct on a fast machine and on a slow one; `sleep 10` is wrong on both.
- **A first boot that needs a human is a first boot that will be done differently
  every time.** Everything the entrypoint does is something that would otherwise
  live in somebody's shell history.
- **Refuse to start on a missing secret.** An empty password that is accepted is
  worse than a deployment that stops.
- **Triggers are part of the pipeline's design**, not a detail. Deciding when a
  workflow must *not* run is as deliberate as deciding when it must.

## Further References

- [Django REST Framework](https://www.django-rest-framework.org/)
- [gunicorn documentation](https://docs.gunicorn.org/)
