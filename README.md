# Dev Session Buddy 🤝

<p align="center">
  <img src="docs/assets/logo-light.png" alt="Dev Session Buddy Logo" width="200"/>
</p>

<div align="center">

[![Tests](https://github.com/codevalve/dev-session-buddy/actions/workflows/test.yml/badge.svg)](https://github.com/codevalve/dev-session-buddy/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/dev-session-buddy)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/codevalve/dev-session-buddy/blob/main/CONTRIBUTING.md)

</div>

Born from the experience of pair programming with AI assistants, Dev Session Buddy is a smart development session startup script that standardizes how project context, tooling, and development standards are communicated to both human and AI collaborators.

## Origin Story 📖

While working on a Vue.js project with AI pair programming assistants, we discovered the need to repeatedly explain project context, available tools, and development standards at the start of each session. This led to the creation of a comprehensive session startup script that could convey this information consistently to both human developers and AI assistants.

## Purpose 🎯

Dev Session Buddy aims to:
- Standardize project context sharing across development sessions
- Streamline onboarding for new team members (human and AI)
- Ensure consistent development practices
- Reduce repetitive explanation of project setup and standards
- Enhance collaboration between developers and AI assistants

## Features ✨

- 🔍 Project context and standards display
- 🛠️ Available tools and environment verification
- 📋 Customizable templates for different frameworks
- 🔄 Git status and branch management
- 📚 Development workflow guidance
- 🎨 Framework-specific best practices
- 🤖 AI-friendly output formatting

## Getting Started 🚀

### Prerequisites

Before using Dev Session Buddy, ensure you have the following installed:
- Git (for version control)
- Node.js (v16 or higher)
- npm (usually comes with Node.js)
- yq (for YAML processing) - Install with:
  ```bash
  # On macOS
  brew install yq

  # On Linux
  sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
  sudo chmod +x /usr/local/bin/yq
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codevalve/dev-session-buddy.git
   ```

2. Install dependencies:
   ```bash
   cd dev-session-buddy
   npm install
   ```

### Project Setup

1. Copy the template for your framework (currently supporting Vue.js):
   ```bash
   cp -r src/templates/vue/* /path/to/your/project
   ```

2. Create a configuration file in your project:
   ```bash
   # Either in project root
   touch dev-session-buddy.yaml
   
   # Or in config directory
   mkdir -p config
   touch config/default.yaml
   ```

3. Configure your project settings (example configuration):
   ```yaml
   name: "My Project"
   tools:
     required:
       - git
       - node
       - npm
     optional:
       - gh
       - docker
       - aws-cli
   standards:
     - "Follow project coding standards"
     - "Write clear commit messages"
     - "Document complex logic"
   ```

### Usage

Start a new development session:
```bash
./session-start.sh
```

This will:
1. Display project context and standards
2. Verify required tools are installed
3. Show git status and recent commits
4. Present development workflow guidance
5. Provide framework-specific best practices

### Example Output

```
=== My Project Development Session Start ===

Current branch: develop

Quick Reference:
1. Branch naming:
   - features: feature/descriptive-name
   - fixes: fix/descriptive-name
   - refactors: refactor/descriptive-name
2. Commit format:
   type(scope): description
   Scopes: ui|api|docs|deps

Recent commits:
abc1234 feat: add new feature
def5678 fix: resolve bug
ghi9012 docs: update README

Development Environment:
- Git (required)
- Node.js (required)
- npm (required)
- Docker (optional)

=== Ready to Code! ===
```

### Project Structure
```
dev-session-buddy/
├── src/
│   ├── core/          # Core functionality
│   ├── templates/     # Framework-specific templates
│   └── utils/         # Utility functions
├── config/           # Default configurations
└── docs/            # Documentation
```

### Common Configurations

Here are some common configuration examples:

```yaml
# Basic configuration
name: "My Project"
tools:
  required:
    - git
    - node
  optional:
    - docker

# Full configuration with all options
name: "Advanced Project"
description: "A complex project with multiple tools"
tools:
  required:
    - git
    - node
    - npm
    - python3
  optional:
    - docker
    - aws-cli
    - terraform
standards:
  - "Use TypeScript for new features"
  - "Write unit tests for all components"
  - "Follow GitFlow branching strategy"
git:
  main_branch: main
  develop_branch: develop
  feature_prefix: feature
  fix_prefix: fix
frameworks:
  - vue
  - typescript
ci:
  provider: github-actions
  node_versions:
    - 16
    - 18
```

### Advanced Usage

#### Custom Templates

Create a custom template for your framework:

1. Create a new directory in `src/templates/`:
   ```bash
   mkdir src/templates/my-framework
   ```

2. Add required files:
   - `session-start.sh`: Main script
   - `config-template.yaml`: Default configuration
   - `README.md`: Template documentation

#### Multiple Projects

Use Dev Session Buddy across multiple projects:

1. Install globally:
   ```bash
   npm install -g @devsessionbuddy/cli
   ```

2. Initialize in any project:
   ```bash
   dsb init --framework vue
   ```

### Troubleshooting

Common issues and solutions:

1. **Script Permission Errors**
   ```bash
   chmod +x session-start.sh
   ```

2. **Missing Dependencies**
   - Ensure Node.js version is 16 or higher
   - Run `npm install` in project root
   - Check PATH for required tools

3. **Configuration Not Found**
   - Ensure config file is in project root or config/
   - Check file permissions
   - Validate YAML syntax

4. **Git Integration Issues**
   - Ensure you're in a git repository
   - Check git installation: `git --version`
   - Verify git remote configuration

5. **Framework Template Issues**
   - Verify template exists for your framework
   - Check template files permissions
   - Ensure all template files were copied

For more complex issues:
1. Enable debug mode: `DEBUG=true ./session-start.sh`
2. Check logs in `~/.dev-session-buddy/logs/`
3. [Open an issue](https://github.com/codevalve/dev-session-buddy/issues) with debug output

## Testing 🧪

Dev Session Buddy uses a comprehensive testing approach with both JavaScript and shell script testing:

### Test Frameworks

- **Jest**: For JavaScript unit testing
  - Configuration validation
  - Project structure verification
  - Utility function testing

- **BATS** (Bash Automated Testing System): For shell script testing
  - Script functionality verification
  - Environment setup testing
  - Tool availability checks

### Running Tests

```bash
# Run all tests
npm test

# Run only JavaScript tests
npm run test:unit

# Run only shell script tests
npm run test:shell

# Run shell script linting
npm run lint:shell

# Run tests in watch mode (during development)
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/           # JavaScript unit tests
│   └── config.test.js
├── integration/    # Integration tests
├── shell/          # Shell script tests
│   └── session-start.bats
└── test_helper.bash # Test helper functions
```

### Writing Tests

1. **JavaScript Tests**
   - Place in `tests/unit/` or `tests/integration/`
   - Use `.test.js` or `.spec.js` extension
   - Follow Jest testing patterns

2. **Shell Script Tests**
   - Place in `tests/shell/`
   - Use `.bats` extension
   - Import test helper: `load '../test_helper'`

### Coverage Reports

Test coverage reports are generated in the `coverage/` directory after running `npm run test:coverage`. The project aims for:

- Line coverage: 80%
- Branch coverage: 80%
- Function coverage: 90%

## Configuration 🔧

[Coming Soon]

## Templates 📑

[Coming Soon]

## Contributing 🤝

We welcome contributions! Whether you're adding new framework templates, improving existing features, or fixing bugs, please feel free to contribute.

## License 📄

MIT License - feel free to use this in your own projects!

## Acknowledgments 👏

Special thanks to the AI named Cascade who helped identify this need and contributed to not only the initial implementation, but came up with the name for the project. This collaboration exemplifies how AI assistants can be creative partners in solving development challenges.
