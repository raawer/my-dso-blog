import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# Minecraft Server

A self-hosted Minecraft Java Edition server, containerized from scratch instead of
pulling a ready-made image. The game was the pretext; the subject was what a
trustworthy container image actually looks like — a verified download, an
unprivileged process, configuration from the environment, and data that outlives
the container it runs in.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/dso-minecraft-server"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

```bash
cp example.env .env     # set EULA=true
docker compose up -d --build
```

The server answers on the port given by `HOST_PORT`, by default `8888`:

```bash
mcstatus localhost:8888 status
```

## Description

### Building the image rather than pulling one

Ready-made Minecraft images exist, and using one would have been a single line of
Compose. The image here is built on a minimal `eclipse-temurin` JRE base and the
server JAR is downloaded from Mojang during the build, then **verified against a
pinned SHA-256 checksum**. If the file at that URL ever changes, the build stops
instead of quietly shipping something else.

That is the whole point of the exercise. A container image is a supply chain: every
layer is code somebody else wrote, arriving over the network at build time. A
checksum is the cheapest place to put a tripwire.

### An unprivileged process

The container runs as a dedicated non-root user. Nothing about a Minecraft server
needs root, and the default of running as root means that a process escape starts
with full privileges inside the container rather than none.

### Configuration, shutdown and persistence

`entrypoint.sh` refuses to start unless the EULA has been accepted through an
environment variable — an explicit decision rather than a value baked into the
image. It then starts the JVM so that shutdown signals reach the Java process,
which lets Minecraft write its world to disk before the container stops. The world
itself lives in a named volume and survives the container being recreated; the
restart policy brings the service back after a crash.

`.dockerignore` restricts the build context to the single file the build needs, so
nothing from the working directory is sent to the daemon by accident.

## Key Takeaways

- **A pinned checksum turns a download into a verification.** Without it, "build
  the image again" and "build the same image again" are different statements.
- **Non-root costs one line and removes a whole class of escalation.** There is no
  reason to postpone it.
- **A container that cannot be stopped cleanly loses data.** Signal handling is not
  a detail of the entrypoint, it is the difference between a saved world and a
  corrupted one.
- **The boring projects are the good ones to practise on.** Nobody attacks a private
  Minecraft server, which is exactly why it is a safe place to get the habits right.

## Further References

- [Mojang EULA](https://aka.ms/MinecraftEULA)
- [eclipse-temurin on Docker Hub](https://hub.docker.com/_/eclipse-temurin)
- [mcstatus](https://github.com/py-mine/mcstatus)
