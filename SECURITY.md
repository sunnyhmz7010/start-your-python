# Security Policy

## Supported Versions

Security fixes are provided for the latest stable release line only.

| Version | Supported |
| --- | --- |
| latest stable release line | Yes |
| older stable releases | No |
| `beta` / `alpha` / `snapshot` | No |

## Reporting a Vulnerability

If you discover a security vulnerability, please do not open a public issue, discussion, or publish a proof of concept before contacting us privately.

Please report security issues through one of the following channels:

- GitHub Security Advisories / private vulnerability report
- Email: `mail@sunnyhmz.top`

When possible, include:

- affected version(s)
- vulnerability type and impact
- reproduction steps or a minimal proof of concept
- suggested remediation details, if available

## Response Process

- Reports will be reviewed and validated as soon as possible.
- Confirmed security issues will be prioritized for a fix on the latest stable release line.
- Exploitable technical details will not be disclosed publicly before a fix is available.
- Once a fix is released, the relevant release notes will document the security-related changes when appropriate.

## Scope

This policy mainly covers security issues in:

- desktop app code directly maintained in this repository
- local lesson content parsing and Markdown rendering
- Tauri commands and frontend-to-native data handling
- Python runtime detection, process launch, input forwarding, and process stopping
- persisted local learning progress and terminal state handling
- mobile reader build configuration and bundled web assets

Third-party dependency vulnerabilities may not always receive a separate public disclosure, but they will be updated or mitigated as compatibility allows.
