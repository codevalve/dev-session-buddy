# Vue.js Template

A comprehensive Vue.js template for Dev Session Buddy that provides a full-featured development environment setup with best practices and standards for Vue.js projects.

## Features

- Vue.js 3 with Composition API
- Vite for fast development and building
- Comprehensive development session setup
- Vue.js best practices and standards
- Automated testing setup with Vitest
- Git hooks configuration
- Editor settings for Vue files
- Component documentation requirements

## Usage

To use this template:

```bash
# Create a new project
npx create-dev-session-buddy my-vue-app --framework vue

# Or initialize in an existing Vue.js project
cd my-vue-app
npx dev-session-buddy init --framework vue
```

## Configuration

The template provides a comprehensive configuration in `config-template.yaml`:

- Vue.js specific requirements
- Development scripts
- Tool configurations
- Vue.js coding standards
- Testing setup
- Documentation requirements

## Project Structure

```
.
├── .dev-session-buddy/   # Dev Session Buddy configuration and cache
├── docs/                 # Project documentation
├── src/                  # Source code
│   ├── assets/          # Static assets
│   ├── components/      # Vue components
│   ├── composables/     # Vue composables
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   └── views/           # Vue views/pages
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   └── e2e/            # End-to-end tests
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## Standards

This template enforces Vue.js best practices:

- Composition API usage
- Vue.js Style Guide adherence
- Component documentation
- Unit testing requirements
- Code style (@vue/airbnb)
- Git workflow

## Development Workflow

1. Start development session:
   ```bash
   npm start
   ```

2. Development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Customization

1. Modify `config-template.yaml` to adjust Vue.js standards
2. Update `session-start.sh` to add custom setup steps
3. Configure Vite and testing setup
4. Adjust editor settings for Vue files

## Contributing

To contribute improvements to this template:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow our [contribution guidelines](../../CONTRIBUTING.md).
