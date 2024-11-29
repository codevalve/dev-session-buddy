#!/usr/bin/env bats

setup() {
    load '../test_helper'
    # Source your script
    source "${BATS_TEST_DIRNAME}/../../src/templates/vue/session-start.sh"
}

@test "verify script exists" {
    [ -f "${BATS_TEST_DIRNAME}/../../src/templates/vue/session-start.sh" ]
}

@test "verify common.sh exists" {
    [ -f "${BATS_TEST_DIRNAME}/../../src/core/common.sh" ]
}

@test "check required tools are available" {
    command -v git
    command -v node
    command -v npm
}

@test "check config file locations" {
    [ -f "${PROJECT_ROOT}/config/default.yaml" ] || [ -f "${PROJECT_ROOT}/dev-session-buddy.yaml" ]
}
