import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# Baby Tools World

A full-stack online shop built with Django — product catalogue, categories, tags,
user registration and a review form, served from a container image and guarded by a
GitHub Actions pipeline that lints, checks formatting and runs the test suite
against a coverage threshold.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/baby-tools-world"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

Run it directly on the host:

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp example.env src/.env      # the file has to sit next to manage.py
cd src
python manage.py migrate
python manage.py seed_db     # categories and sample products
python manage.py runserver
```

The shop is then available at `http://localhost:8000`, the admin interface at
`http://localhost:8000/admin/`.

Or run it as a container, which does the whole setup on startup:

```bash
docker build -t baby-tools-world:local .
docker run --rm -it -p 8000:8000 --env-file .env baby-tools-world:local
```

## Description

### Two apps instead of one

The project is split into a `products` app for the catalogue and a `users` app for
registration and login. Each owns its own `models.py`, `views.py`, `urls.py` and
`admin.py`.

The split is not cosmetic. Authentication is the part most worth attacking, and
keeping it in its own app means its models and views can be reviewed without
reading the catalogue code at the same time.

### Tags as a relation, not a string

Products carry tags through their own model and a relation, rather than a
comma-separated text field. That costs one more table and buys filtering in the
admin interface, which a parsed string cannot give — and it removes a whole class
of input-handling bugs, because there is nothing left to parse.

### The pipeline is the reviewer

The workflow runs on every push and pull request that touches Python code, in two
jobs:

```yaml
test:
  needs: lint
```

The order matters. `lint` runs `flake8`, then `black --check` and
`isort --check-only`. The `--check` variants report and **exit non-zero** instead of
rewriting the files — a pipeline that silently fixes things teaches nobody anything
and hides what changed. Only if that job passes does `test` start, so CI minutes are
not spent testing code that has not cleared the style gate.

The test job runs Django's test runner under `coverage` with
`--fail-under 69`, so coverage is a condition rather than a statistic. On pull
requests the report is additionally posted as a comment, which puts the number in
front of a reviewer instead of inside a log nobody opens.

### Repeatable data

A `seed_db` management command fills the database with categories, sample products
and their images. Being a management command rather than a fixture file means it
runs the same way locally, in the container's entrypoint and in CI — one code path
instead of three.

### Where this stops being production-ready

The container entrypoint runs `collectstatic`, the migrations, `createsuperuser`
and `seed_db`, and then starts the application with `manage.py runserver`. That is
deliberate for a demo image and wrong for a real deployment, for three separate
reasons:

- **`runserver` is the development server.** Django's own documentation says not to
  use it in production. A WSGI server such as Gunicorn belongs in front of the
  application; the repository documents the setup under `docs/wsgi.md`.
- **`makemigrations` at container start** generates schema changes at runtime.
  Migrations are source code: they belong in the repository, reviewed, so that every
  environment applies the same ones.
- **`DEBUG` defaults to on.** Django's debug page prints the traceback and the
  settings to whoever triggered the error. The default has to be `False`, with
  development switching it on — not the other way round.

Naming these is part of the exercise. Knowing where a setup ends is more useful than
pretending it does not.

## Key Takeaways

- **A check that only reports is advice; a check that fails is a rule.** `black .`
  and `black --check .` differ by one flag and by everything else.
- **Order the pipeline so the cheap gate runs first.** `needs: lint` keeps the slow
  job from running on code that was never going to pass.
- **Coverage without a threshold is decoration.** `--fail-under` turns the number
  into a decision.
- **`|| true` hides the error you actually needed to see.** It belongs on commands
  whose failure is genuinely expected, not on every command that is noisy.
- **Secure defaults point at the safe state.** Anything that has to be switched off
  to be safe will eventually be found switched on.

## Further References

- [Django documentation](https://docs.djangoproject.com/en/stable/)
- [Django deployment checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [coverage.py](https://coverage.readthedocs.io/)
