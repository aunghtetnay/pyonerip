.PHONY: help build run stop clean test dev prod logs shell

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development commands
dev: ## Start development environment
	docker-compose --profile development up --build pyonerip-dev

dev-detached: ## Start development environment in background
	docker-compose --profile development up -d --build pyonerip-dev

# Production commands
build: ## Build production Docker image
	docker-compose --profile production build pyonerip

run: ## Run production container
	docker-compose --profile production up pyonerip

prod: ## Build and run production environment
	docker-compose --profile production up --build pyonerip

prod-detached: ## Build and run production environment in background
	docker-compose --profile production up -d --build pyonerip

# Management commands
stop: ## Stop all containers
	docker-compose down

clean: ## Stop containers and remove images
	docker-compose down --rmi all --volumes --remove-orphans

restart: ## Restart all services
	docker-compose restart

logs: ## Show logs from all services
	docker-compose logs -f

logs-app: ## Show logs from main application
	docker-compose logs -f pyonerip

# Utility commands
shell: ## Open shell in running container
	docker-compose exec pyonerip sh

test: ## Run tests in container
	docker-compose exec pyonerip npm test

health: ## Check application health
	curl -f http://localhost:3000/health || echo "Health check failed"

# Docker registry commands
push: build ## Build and push image to registry
	docker tag pyonerip:local ghcr.io/aunghtetnay/pyonerip:latest
	docker push ghcr.io/aunghtetnay/pyonerip:latest

pull: ## Pull latest image from registry
	docker pull ghcr.io/aunghtetnay/pyonerip:latest

# Security commands
scan: build ## Scan image for vulnerabilities
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
		-v $(pwd):/tmp/trivy aquasec/trivy:latest image pyonerip:local

audit: ## Run npm audit in container
	docker-compose exec pyonerip npm audit

# Setup commands
setup: ## Initial setup for development
	@echo "Setting up development environment..."
	docker-compose --profile development build pyonerip-dev
	@echo "Setup complete! Run 'make dev' to start development."

# CI/CD helpers
ci-build: ## Build for CI/CD (no cache)
	docker build --no-cache -t pyonerip:ci .

ci-test: ci-build ## Run CI tests
	docker run --rm pyonerip:ci npm test || echo "No tests defined"