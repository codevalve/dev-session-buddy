#!/bin/bash

# Import common functions and variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../../core/common.sh"

# Load configuration
CONFIG_FILE="${SCRIPT_DIR}/../../dev-session-buddy.yaml"
if [ ! -f "$CONFIG_FILE" ]; then
    CONFIG_FILE="${SCRIPT_DIR}/../../config/default.yaml"
fi

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load project name from config
PROJECT_NAME=$(yq eval '.name' "$CONFIG_FILE")
echo -e "${BLUE}=== $PROJECT_NAME Development Session Start ===${NC}\n"

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Current branch: ${GREEN}$CURRENT_BRANCH${NC}\n"

# Warning if on main/master
if [[ "$CURRENT_BRANCH" =~ ^(main|master)$ ]]; then
    echo -e "${RED}⚠️  WARNING: You are on the $CURRENT_BRANCH branch!${NC}"
    echo -e "${RED}Please create a feature branch before making changes.${NC}\n"
fi

# Show quick reference
echo -e "${YELLOW}Quick Reference:${NC}"
echo -e "1. Branch naming:"
# Get branch types from config
BRANCH_TYPES=$(yq eval '.standards.branches.types[]' "$CONFIG_FILE" | tr '\n' ' ')
for type in $BRANCH_TYPES; do
    echo -e "   - ${type}s: ${GREEN}${type}/descriptive-name${NC}"
done

echo -e "2. Commit format:"
echo -e "   ${GREEN}type(scope): description${NC}"
# Get scopes from config
SCOPES=$(yq eval '.standards.commit.scopes[]' "$CONFIG_FILE" | tr '\n' '|')
echo -e "   Scopes: ${GREEN}${SCOPES}${NC}"

# Show recent commits
echo -e "\n${YELLOW}Recent commits:${NC}"
git --no-pager log --oneline -n 3

# Show any stashed changes
STASH_COUNT=$(git stash list | wc -l)
if [ $STASH_COUNT -gt 0 ]; then
    echo -e "\n${YELLOW}Stashed changes:${NC}"
    git stash list | head -n 3
fi

# Show development environment notes
echo -e "\n${YELLOW}Development Environment:${NC}"

# Show tools section
echo -e "\n1. ${YELLOW}Available Tools & Environment:${NC}"
# Required tools
REQUIRED_TOOLS=$(yq eval '.tools.required[]' "$CONFIG_FILE")
for tool in $REQUIRED_TOOLS; do
    echo -e "   - ${GREEN}${tool}${NC} (required)"
done
# Optional tools
OPTIONAL_TOOLS=$(yq eval '.tools.optional[]' "$CONFIG_FILE")
for tool in $OPTIONAL_TOOLS; do
    echo -e "   - ${GREEN}${tool}${NC} (optional)"
done

# Show project standards
echo -e "\n2. ${YELLOW}Project Standards:${NC}"
yq eval '.standards.key_points[]' "$CONFIG_FILE" | while read -r point; do
    echo -e "   - ${point}"
done

# Show tech stack
echo -e "\n3. ${YELLOW}Tech Stack:${NC}"
echo -e "   - ${GREEN}Vue.js 3${NC} with Composition API"
echo -e "   - ${GREEN}Vite${NC} for build tooling and dev server"
echo -e "   - ${GREEN}$(yq eval '.framework' "$CONFIG_FILE")${NC}"
echo -e "   - ${GREEN}$(yq eval '.type' "$CONFIG_FILE")${NC} type"

# Show workflow commands
echo -e "\n4. ${YELLOW}Development Workflow:${NC}"
echo -e "   - Auto-reload enabled (Vite HMR)"
echo -e "   - Run ${GREEN}$(yq eval '.workflow.dev_server' "$CONFIG_FILE")${NC} to start development server"
echo -e "   - Run ${GREEN}$(yq eval '.workflow.test' "$CONFIG_FILE")${NC} for unit tests"
echo -e "   - Run ${GREEN}$(yq eval '.workflow.build' "$CONFIG_FILE")${NC} for production build"

# Show style guide
echo -e "\n5. ${YELLOW}Code Style & Best Practices:${NC}"
yq eval '.style_guide.key_points[]' "$CONFIG_FILE" | while read -r point; do
    echo -e "   - ${point}"
done

echo -e "\n${BLUE}=== Ready to Code! ===${NC}"

# Final warning if on main/master
if [[ "$CURRENT_BRANCH" =~ ^(main|master)$ ]]; then
    echo -e "\n${RED}⚠️  REMINDER: You are still on the $CURRENT_BRANCH branch!${NC}"
    echo -e "${RED}Run: ${GREEN}git checkout -b feature/your-feature-name${NC} ${RED}to create a new feature branch.${NC}"
fi
