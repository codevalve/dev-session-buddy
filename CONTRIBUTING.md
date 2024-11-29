# Contributing to Dev Session Buddy 🤝

Thank you for your interest in contributing to Dev Session Buddy! This document provides guidelines and workflows for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [GitFlow Workflow](#gitflow-workflow)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Code Style Guidelines](#code-style-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## GitFlow Workflow

We follow the GitFlow branching strategy:

### Main Branches
- `main`: Production-ready code
- `develop`: Integration branch for features

### Supporting Branches
- `feature/*`: New features
- `fix/*`: Bug fixes
- `refactor/*`: Code refactoring
- `docs/*`: Documentation changes
- `release/*`: Release preparation
- `hotfix/*`: Urgent production fixes

### Branch Naming Convention
- Features: `feature/descriptive-name`
- Bug fixes: `fix/descriptive-name`
- Refactoring: `refactor/descriptive-name`
- Documentation: `docs/descriptive-name`

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/dev-session-buddy.git
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/codevalve/dev-session-buddy.git
   ```
4. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

## Development Process

1. **Start from Develop**
   ```bash
   git checkout develop
   git pull upstream develop
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write code
   - Add tests if applicable
   - Update documentation

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "type(scope): description"
   ```

5. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Target the `develop` branch
   - Fill out PR template
   - Link related issues

## Pull Request Guidelines

1. **Title Format**
   - Use the format: `type: description`
   - Example: `feat: add new template for React projects`

2. **Description**
   - Explain the changes made
   - List any breaking changes
   - Reference related issues

3. **Checklist**
   - [ ] Tests added/updated (if applicable)
   - [ ] Documentation updated
   - [ ] Follows code style guidelines
   - [ ] Commit messages follow guidelines

4. **Review Process**
   - At least one approval required
   - All discussions resolved
   - CI checks passing

## Commit Message Guidelines

Follow the Conventional Commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Scopes
- `core`: Core functionality
- `templates`: Template-related changes
- `docs`: Documentation
- `deps`: Dependencies
- `ci`: CI/CD changes

Example:
```
feat(templates): add React project template

- Add basic React template
- Include React-specific configuration
- Update documentation

Closes #123
```

## Code Style Guidelines

1. **Shell Scripts**
   - Use shellcheck for linting
   - Add comments for complex logic
   - Use meaningful variable names

2. **JavaScript/Node.js**
   - Follow ESLint configuration
   - Use meaningful variable names
   - Add JSDoc comments for functions

3. **YAML Configuration**
   - Use consistent indentation (2 spaces)
   - Add comments for clarity
   - Keep files organized by section

4. **Documentation**
   - Use clear, concise language
   - Include code examples
   - Keep formatting consistent

## Questions or Need Help?

Feel free to:
- Open an issue for questions
- Join discussions in existing issues
- Reach out to maintainers

Thank you for contributing to Dev Session Buddy! 🎉
