# Docker Hub Setup Instructions

## Required Setup for Docker Hub Integration

To enable publishing to Docker Hub, you need to create the following GitHub repository secrets:

### 1. Create Docker Hub Account
1. Go to [Docker Hub](https://hub.docker.com) and create an account
2. Verify your email address
3. Create a new repository named `pyonerip` (public repository recommended for open source)

### 2. Generate Docker Hub Access Token
1. Go to [Docker Hub Account Settings](https://hub.docker.com/settings/security)
2. Click **"New Access Token"**
3. Name: `GitHub Actions - pyonerip`
4. Access permissions: **Read, Write, Delete**
5. Copy the generated token (you won't see it again!)

### 3. Add GitHub Repository Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | Used for authentication |
| `DOCKERHUB_TOKEN` | Generated access token | Used instead of password |

### 4. Repository Settings
Ensure your GitHub repository has the correct workflow permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under **"Workflow permissions"** select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

## After Setup

Once configured, the workflow will automatically:

**Build and push to both registries**:
- `ghcr.io/aunghtetnay/pyonerip:latest`
- `docker.io/aunghtetnay/pyonerip:latest`

**Security scan images first** with Trivy before publishing

**Multi-architecture support** (AMD64 + ARM64)

**Automated tagging**:
- `latest` (from main branch)
- `develop` (from develop branch)  
- `v1.0.0` (from git tags)
- `commit-20250917-abc1234` (from commits)

## Verification

### Test the Setup
1. Push a commit to `main` branch
2. Check GitHub Actions tab for workflow run
3. Verify images are published to both registries:
   ```bash
   # Pull from GitHub Container Registry
   docker pull ghcr.io/aunghtetnay/pyonerip:latest
   
   # Pull from Docker Hub
   docker pull aunghtetnay/pyonerip:latest
   ```

### Check Security Scans
- Go to **Security** tab in your GitHub repository
- Look for Trivy scan results under **Code scanning alerts**

## Troubleshooting

### Common Issues:

1. **"denied: installation not allowed"**
   - Check repository workflow permissions
   - Ensure `packages: write` permission is set

2. **Docker Hub authentication failed**
   - Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets
   - Ensure Docker Hub repository exists and is accessible

3. **Multi-architecture build fails**
   - Usually resolves automatically with retry
   - Check for platform-specific dependencies in Dockerfile

### Manual Testing
```bash
# Test login locally (optional)
echo $DOCKERHUB_TOKEN | docker login -u $DOCKERHUB_USERNAME --password-stdin

# Test multi-registry pull
docker pull ghcr.io/aunghtetnay/pyonerip:latest
docker pull aunghtetnay/pyonerip:latest
```

## Monitoring

The workflow provides comprehensive monitoring:

- **GitHub Actions Summary**: Detailed build information
- **Security Scanning**: Vulnerability reports in Security tab
- **Artifact Storage**: Trivy scan results stored for 30 days
- **PR Comments**: Automatic deployment previews on pull requests

## Workflow Triggers

The workflow runs on:
- Push to `main` or `develop` branches
- Git tags starting with `v` (e.g., `v1.0.0`)
- Manual workflow dispatch
- Pull requests (build only, no push)

## Security-First Approach

The workflow now follows a security-first approach:
1. **Build** - Creates Docker image for testing
2. **Security Scan** - Scans image with Trivy for vulnerabilities
3. **Publish** - Only publishes if security scan passes
4. **Notify** - Reports results and provides usage instructions
5. **Cleanup** - Manages old images and cache

Ready to go!