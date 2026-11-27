# Security policy

pulzr-ui is the design language of the Pulzr Cloud console and the PulzrOS
gateway console. A problem in it (a component that renders untrusted text,
a dependency) reaches both consoles, so we fix those first.

## Reporting a vulnerability

Report it privately through GitHub:
[**Report a vulnerability**](https://github.com/pulzar-net/pulzr-ui/security/advisories/new)
(the Security tab of this repository, then "Report a vulnerability").

Please do not open a public issue, pull request or discussion for a security
problem, and do not post it anywhere public until a fix is released.

A useful report says:

- which version or commit you tested;
- what an attacker needs and what they gain;
- how to reproduce it.

## What happens next

| Step | Target |
|---|---|
| We acknowledge your report | within 3 business days |
| We confirm or rule out the issue and give a severity | within 10 business days |
| We release a fix for a critical or high severity issue | within 30 days of confirming it |
| We release a fix for a medium or low severity issue | in the next release, within 90 days |

We keep you updated in the advisory as we go, agree a disclosure date with
you, and credit you in the advisory and the release notes unless you prefer not
to be named. We publish a GitHub Security Advisory and request a CVE for
every confirmed vulnerability.

If a problem is in a dependency rather than in this repository, we report it
to that project through its own security process and coordinate with you on
both.

## Supported versions

The project is at 0.x. Security fixes go into the latest release only; we do
not backport to older 0.x releases.

| Version | Supported |
|---|---|
| latest 0.x release | yes |
| older releases | no |
| `main` | yes, fixes land here first |

## Scope

In scope: the theme, its components, the starter and the init command, at
every tagged release.

Out of scope: problems in Astro or Starlight themselves (report those to
them), and in a project's own documentation content.
