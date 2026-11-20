import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# V-Server Setup

The initial setup of an Ubuntu virtual server, written down while it happened: a
dedicated SSH key pair, password authentication switched off, nginx serving a
custom site on a chosen port, and the server connected to GitHub over SSH. The
value of this project is the runbook, not the server.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/v-server-setup"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

On the client, create a key pair that is used for this server and nothing else:

```bash
ssh-keygen -t ed25519 -a 100 -f ~/.ssh/id_ed25519_server -C "MacBook Server"
ssh-copy-id -i ~/.ssh/id_ed25519_server.pub user@server
```

Then verify that the key works **before** disabling password login. The order
matters; the other way round locks you out.

## Description

### A dedicated key, not the one you already have

`ed25519` rather than RSA, and `-a 100` for a hundred key-derivation rounds, which
makes an offline attack against the encrypted private key considerably more
expensive. A separate key per host means a compromised key has a known, limited
scope: you revoke one `authorized_keys` entry instead of auditing every machine
you have ever logged into.

### Turning off what you no longer need

With key authentication proven to work, password authentication is disabled in
`sshd_config`. That single change removes brute-force attempts against the account
entirely — they still arrive, they just cannot succeed.

### nginx on a port of my choosing

nginx serves a custom default site on port `8081` instead of `80`. On its own this
is not a security measure; the service is just as reachable. What it does is keep
the noise down in the logs, which makes the entries that matter easier to see.

### Git and GitHub over SSH

The server is configured with its own git identity and its own deploy key, so
commits made there are attributable and the connection to GitHub uses the same key
mechanism as the shell access.

## Key Takeaways

- **Prove the new way in before removing the old one.** Every lockout story starts
  with these two steps in the wrong order.
- **One key per host, one purpose per key.** Revocation is only cheap if you know
  what a key unlocks.
- **A non-standard port is tidiness, not security.** Worth doing, worth not
  mistaking for a defence.
- **Write it down while you do it.** A server you set up once and documented is
  reproducible; a server you set up once is a pet.

## Further References

- [OpenSSH manual](https://www.openssh.com/manual.html)
- [nginx beginner's guide](https://nginx.org/en/docs/beginners_guide.html)
