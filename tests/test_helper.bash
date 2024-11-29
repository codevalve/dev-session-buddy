#!/usr/bin/env bash

# Set up test environment
setup_test_environment() {
    export PROJECT_ROOT="$BATS_TEST_DIRNAME/.."
    export PATH="$PROJECT_ROOT/node_modules/.bin:$PATH"
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
