# Minimal Template

A framework-agnostic template for Dev Session Buddy that provides basic development session setup and project standards.

## Features

- Basic development session setup
- Environment file management
- Dependency installation check
- Development server auto-start (if configured)
- Project standards configuration
- Git hooks setup
- Editor configuration

## Usage

To use this template:

```bash
# Create a new project
npx create-dev-session-buddy my-project --framework minimal

# Or initialize in an existing project
cd my-project
npx dsb init --framework minimal
```

## Configuration

The template provides a base configuration in `config-template.yaml` that you can customize:

- Development requirements
- Script definitions
- Tool configurations
- Project standards

## Project Structure

```
.
├── .dev-session-buddy/   # Dev Session Buddy configuration and cache
├── docs/                 # Project documentation
├── src/                  # Source code
├── tests/               # Test files
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Standards

This template enforces:

- Conventional commits
- Documentation requirements
- Code style (Standard)
- Test coverage requirements
- Editor configuration

## Customization

1. Modify `config-template.yaml` to adjust standards and requirements
2. Update `session-start.sh` to add custom setup steps
3. Add framework-specific configurations as needed

## Contributing

To contribute improvements to this template:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow our [contribution guidelines](../../CONTRIBUTING.md).
