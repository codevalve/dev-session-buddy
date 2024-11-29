#!/usr/bin/env bash

# Set up test environment
setup_test_environment() {
    # Get the absolute path to the project root
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    export PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
    export PATH="$PROJECT_ROOT/node_modules/.bin:$PATH"
    
    # Ensure config directory exists
    mkdir -p "$PROJECT_ROOT/config"
    
    # Create test config if it doesn't exist
    if [ ! -f "$PROJECT_ROOT/config/default.yaml" ]; then
        cat > "$PROJECT_ROOT/config/default.yaml" << EOL
name: "Dev Session Buddy"
tools:
  required:
    - git
    - node
    - npm
EOL
    fi
}

# Helper to create temporary test files
create_temp_file() {
    TMPFILE=$(mktemp)
    echo "$TMPFILE"
}

# Helper to clean up temporary files
cleanup_temp_files() {
    rm -f "$TMPFILE"
}

# Load test environment
setup_test_environment
