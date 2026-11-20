import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# Conduit Deployment

An Angular frontend and a Django REST backend, containerized and then released to a
virtual server by a GitHub Actions workflow. This project continues the Conduit
Container project — that earlier state is preserved under the tag
`conduit-container-v1.0.0`, so both stages remain visible in one repository.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/dso-conduit-container"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

Locally, the whole stack starts with two commands:

```bash
cp example.env .env     # set SECRET_KEY and POSTGRES_PASSWORD
docker compose up --build
```

The application is then available at `http://localhost:8282`. A secret key can be
generated with the standard library rather than invented by hand:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(50))"
```

## Description

### Two images, one workflow

Both images are built with multi-stage Dockerfiles — the frontend compiles with
`node:20-alpine` and is then served by `nginx:alpine`, so the build toolchain never
reaches the running container. The workflow pushes them to the GitHub Container
Registry, tagged by commit SHA, by branch, and with `latest` only on the default
branch.

The commit SHA tag is the one that gets deployed. It is immutable, which makes a
rollback a matter of deploying an older tag rather than rebuilding anything.

### How a deployment runs

The workflow has two jobs and `deploy` only starts once `build` has succeeded, so a
broken build never reaches the server. The application is never compiled on the VM:
the runner builds and pushes, the VM only pulls.

The remote script begins with `set -e`, so the first failing command ends the
deployment and the exit code travels back to the workflow.

### Keeping credentials off the host

Before logging in to the registry, the script points `DOCKER_CONFIG` at a temporary
directory and removes it again through a `trap` on exit. The registry credentials
therefore never land in `~/.docker/config.json` on the VM — not even when the
deployment fails halfway through, and without needing an explicit logout that might
itself be skipped.

After a successful release, unused images are removed so the disk does not fill up
with every version ever deployed.

## Key Takeaways

- **Build on the runner, pull on the server.** A build toolchain on a production
  host is an attack surface that serves no purpose there.
- **An immutable tag makes rollback trivial.** `latest` tells you nothing about what
  is actually running.
- **Clean up in a `trap`, not at the end of the script.** The end of the script is
  exactly where you do not arrive when something goes wrong.
- **A deployment that tidies up after itself is one you dare to run again.** Disk
  space and stale credentials are the two things that quietly accumulate.

## Further References

- [RealWorld / Conduit](https://github.com/gothinkster/realworld)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
