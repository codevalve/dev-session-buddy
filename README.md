# Dev Session Buddy 🤝

<p align="center">
  <img src="docs/assets/logo-light.png" alt="Dev Session Buddy Logo" width="200"/>
</p>

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

### Troubleshooting

1. **Script Permission Issues**
   ```bash
   chmod +x session-start.sh
   ```

2. **Missing Tools**
   - Ensure all required tools are installed
   - Check PATH environment variable
   - Run `which <tool-name>` to verify installation

3. **Configuration Issues**
   - Verify YAML syntax
   - Ensure config file is in correct location
   - Check file permissions

For more help, please [open an issue](https://github.com/codevalve/dev-session-buddy/issues).

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
