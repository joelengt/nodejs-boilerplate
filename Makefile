# Project variables
PROJECT_NAME ?= users
ORG_NAME ?= web-services
REPO_NAME ?= users

# Filenames
DEV_COMPOSE_FILE := .docker/dev/docker-compose.yml
REL_COMPOSE_FILE := .docker/release/docker-compose.yml

# Docker Compose Project Names
REL_PROJECT := $(PROJECT_NAME)$(BUILD_ID)
DEV_PROJECT := $(REL_PROJECT)-dev

COVERAGE_SERVER_PORT := 2323

.PHONY: test build release clean

dev:
	${INFO} "Pulling latest images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull

	${INFO} "Building images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull dev

	${INFO} "Running server..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up -d dev

dev_test:
	${INFO} "Running tests inside container"
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) exec dev npm run test:watch

test:
	${INFO} "Pulling latest images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) pull

	${INFO} "Building images..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build --pull test

	${INFO} "Running tests..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up test
	@ docker cp $$(docker-compose -p $(DEV_PROJECT) -f ${DEV_COMPOSE_FILE} ps -q test):/app/coverage/. coverage

	${INFO} "Testing complete"

test_coverage:
	${INFO} "Spin up a new server serving coverage reports"
	@ ./node_modules/http-server/bin/http-server coverage/lcov-report -p ${COVERAGE_SERVER_PORT} -o

build:
	${INFO} "Creating builder image..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) build builder

	${INFO} "Building application artifacts..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) up builder

	${INFO} "Copying application artifacts..."
	@ rm -rf dist && mkdir -p dist
	@ docker cp $$(docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) ps -q builder):/app/release.tar.gz dist
	@ rm -rf release.tar.gz
	${INFO} "Build complete"

release:
	${INFO} "Building images..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) build app
	${INFO} "Release complete"

install:
	${INFO} "Installing ${package}"
	docker-compose -p ${DEV_PROJECT} -f ${DEV_COMPOSE_FILE} exec dev npm install ${package} ${flag}

clean:
	${INFO} "Destroying development environment..."
	@ docker-compose -p $(DEV_PROJECT) -f $(DEV_COMPOSE_FILE) down -v
	${INFO} "Destroying release environment..."
	@ docker-compose -p $(REL_PROJECT) -f $(REL_COMPOSE_FILE) down -v
	${INFO} "Removing dangling images..."
	@ docker image prune -f
	${INFO} "Clean complete"


# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
  printf $(YELLOW); \
  echo "=> $$1"; \
  printf $(NC)' SOME_VALUE
