#!/bin/bash

# Get the project root directory
PROJECT_ROOT=""
if ! PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null); then
    echo "Error: Not in a git repository"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check required tools
check_required_tools() {
    local config_file="$1"
    local missing_tools=()
    
    # Get required tools and check each one
    for tool in $(yq eval '.tools.required[]' "$config_file"); do
        if ! command_exists "$tool"; then
            missing_tools+=("$tool")
        fi
    done
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        echo -e "${RED}Missing required tools:${NC}"
        printf '  - %s\n' "${missing_tools[@]}"
        exit 1
    fi
}

# Function to load and validate config
load_config() {
    local config_file="$1"
    if [ ! -f "$config_file" ]; then
        echo "Error: Configuration file not found at $config_file"
        exit 1
    fi
    
    # Basic validation of required fields
    local required_fields=("name" "framework" "type")
    for field in "${required_fields[@]}"; do
        if [ -z "$(yq eval ".$field" "$config_file")" ]; then
            echo "Error: Required field '$field' not found in config"
            exit 1
        fi
    done
}

# Function to format text with emoji
format_section() {
    local title="$1"
    local emoji="$2"
    echo -e "\n${YELLOW}${emoji} ${title}:${NC}"
}

# Export variables
export PROJECT_ROOT
export RED GREEN YELLOW BLUE NC
