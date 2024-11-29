#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project info
PROJECT_NAME="Dev Session Buddy"
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
echo -e "   - features: ${GREEN}feature/descriptive-name${NC}"
echo -e "   - fixes: ${GREEN}fix/descriptive-name${NC}"
echo -e "   - docs: ${GREEN}docs/descriptive-name${NC}"

echo -e "\n2. Commit format:"
echo -e "   ${GREEN}type(scope): description${NC}"
echo -e "   Types: feat, fix, docs, style, refactor, test, chore"
echo -e "   Scopes: cli, template, config, docs, test"

# Show recent commits
echo -e "\n${YELLOW}Recent commits:${NC}"
git --no-pager log --oneline -n 5

# Show current status
echo -e "\n${YELLOW}Current status:${NC}"
git status -s

# Environment check
echo -e "\n${YELLOW}Environment check:${NC}"
node --version
npm --version

# Show available scripts
echo -e "\n${YELLOW}Available scripts:${NC}"
npm run | grep -v "^  \(prebuild\|postbuild\)" | grep "^  [^ ]" || true
