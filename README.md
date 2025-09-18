# Pyone Play Ripper

[![Docker Build and Publish](https://github.com/aunghtetnay/pyonerip/actions/workflows/docker.yml/badge.svg)](https://github.com/aunghtetnay/pyonerip/actions/workflows/docker.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Pulls](https://img.shields.io/docker/pulls/ahnay/pyonerip)](https://hub.docker.com/r/ahnay/pyonerip)
[![GHCR Pulls](https://img.shields.io/badge/GHCR-ghcr.io%2Faunghtetnay%2Fpyonerip-blue)](https://github.com/aunghtetnay/pyonerip/pkgs/container/pyonerip)

A robust video ripper for Pyone Play content with Docker support and automated CI/CD pipeline.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Pull the latest image
docker pull ghcr.io/aunghtetnay/pyonerip:latest

# Run the container
docker run -d \
  --name pyonerip \
  -p 3000:3000 \
  -e NODE_ENV=production \
  ghcr.io/aunghtetnay/pyonerip:latest
```

### Using Docker Compose

```yaml
version: '3.8'
services:
  pyonerip:
    image: ghcr.io/aunghtetnay/pyonerip:latest
    container_name: pyonerip
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 5s
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/aunghtetnay/pyonerip.git
cd pyonerip

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

## 📋 API Endpoints

- **Health Check**: `GET /health` - Container health status
- **API Documentation**: `GET /api-docs` - Swagger UI
- **Shows**: `GET /api/v1/shows` - List all shows
- **Episodes**: `GET /api/v1/episodes` - List all episodes
- **Channels**: `GET /api/v1/channels` - List all channels
- **Rip**: `POST /api/v1/rip` - Start ripping process

## 🐳 Docker Image Management

### Available Tags

- `latest` - Latest stable release from main branch
- `develop` - Latest development build
- `v*` - Specific version tags (e.g., `v1.0.0`)
- `commit-YYYYMMDD-<sha>` - Specific commit builds

### Multi-Architecture Support

The Docker images are built for multiple architectures:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM64/Apple Silicon)

### Security Features

- **Non-root user**: Container runs as `nodeuser` (UID 1001)
- **Vulnerability scanning**: Automated scanning with Trivy
- **Security updates**: Dependabot for dependency updates
- **Minimal base image**: Alpine Linux for reduced attack surface

## 🔄 CI/CD Pipeline

### Automated Workflows

1. **Docker Build and Publish** (`.github/workflows/docker.yml`)
   - Triggers on push to `main`/`develop` branches and tags
   - Multi-stage builds with caching
   - Multi-architecture builds
   - Security scanning with Trivy
   - Automated deployment to staging/production

2. **Dependency Management** (`.github/workflows/dependencies.yml`)
   - Weekly dependency updates
   - Security audit scanning
   - Auto-merge for minor/patch updates

### Deployment Environments

- **Staging**: Auto-deploy from `develop` branch
- **Production**: Auto-deploy from tagged releases (`v*`)

## Process

### Parsing

This ripper is designed to extract video files by obtaining the m3u8 playlist URL, parsing it, and creating a list of available resolutions along with the corresponding m3u8 file URLs. The m3u8 playlist is retrieved using the requests library, and once obtained, it is parsed and extract the available resolutions and their corresponding video URLs. This allows the ripper to provide users with a list of available video resolutions to choose from, and to download the selected video file at the desired resolution.

### Downloading

Once the list of video chunks' URLs is obtained, they need to be written into a file in order to be downloaded using `wget`. The code for downloading the chunks and saving them to disk is provided in the [saveChunks.js](./ripper/saveChunks.js) file. It creates a new directory, and then downloads the chunks in **parallel**.

wget is invoked with a set of options that include the list of chunk URLs to download, the directory to save them in, and limits on the number of download retries and the download rate per chunk. The function also creates a temporary directory with a unique name and saves the downloaded chunks into it.

```javascript
const cp = spawn('wget', wgetOptions, { stdio: 'inherit' })
cp.on('spawn', () => console.log('spawned', process.pid))
cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
```

``` javascript
const readStream = Readable.from(chunksUrlList)
const writeStream = createWriteStream(`${dirname}/${urlFileName}`)
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(`${chunk}\n`)
        callback()
    }
})
```

```javascript
const writeFile = readStream.pipe(transformStream).pipe(writeStream)
```

### Merging

After all of the video chunks have been downloaded, the process is handed off to [mergeChunks.js](./ripper/mergeChunks.js), which uses the ffmpeg tool to merge the chunks into a single video file.

`mergeChunks.js` is passed the directory path of the downloaded video chunks as a command line argument. It reads the contents of the directory, sorts the files in ascending order according to their names, and constructs a file list to pass to ffmpeg for merging the chunks into a single video file.

```javascript
const dirContents = await readdir(dirname)
const tsFiles = dirContents
    .filter(file => file.endsWith('.ts'))
    .map(file => `${dirname}/${file}`)
    .sort(sortByNumber)
    .join('|')
```

Once the necessary chunks are located and prepared, the child process is spawned to run the `FFmpeg` command. `FFmpeg` is a popular open-source tool used for handling video and audio processing tasks, such as video encoding, decoding, and transcoding.

```javascript
const cp = spawn('ffmpeg', ffmpegOptions, { stdio: 'inherit' })
```

After the spawn method is called, the child process's events are listened to. If the child process exits with a non-zero exit code, the returned promise is rejected with the error code. If the child process exits with a zero exit code, the returned promise is resolved with the output file name.

## Security & Monitoring

### Security Scanning

All Docker images are automatically scanned for vulnerabilities using Trivy:
- **Vulnerability scanning**: Checks for known CVEs in OS and library dependencies
- **Configuration scanning**: Validates Docker best practices
- **Severity filtering**: Blocks deployment for CRITICAL/HIGH severity issues
- **Security reports**: Available in GitHub Security tab

### Security Updates

To update dependencies and fix security vulnerabilities:

```bash
# Run the security update script
./scripts/security-update.sh

# Or manually update
npm audit fix
npm audit --audit-level high
```

### Current Security Status

The project follows security best practices:
- Automated dependency scanning with Trivy
- Non-root Docker container execution
- Regular dependency updates via Dependabot
- Security-first CI/CD pipeline (scan before publish)

## Development

### Building Locally

```bash
# Build Docker image
docker build -t pyonerip:local .

# Run locally built image
docker run -p 3000:3000 pyonerip:local
```

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Health check
curl http://localhost:3000/health
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |

## 📦 Production Deployment

### Kubernetes Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pyonerip
spec:
  replicas: 3
  selector:
    matchLabels:
      app: pyonerip
  template:
    metadata:
      labels:
        app: pyonerip
    spec:
      containers:
      - name: pyonerip
        image: ghcr.io/aunghtetnay/pyonerip:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: pyonerip-service
spec:
  selector:
    app: pyonerip
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure Docker builds pass
- Security scan must pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/aunghtetnay/pyonerip)
- [Docker Hub](https://github.com/aunghtetnay/pyonerip/pkgs/container/pyonerip)
- [Issues](https://github.com/aunghtetnay/pyonerip/issues)
- [Releases](https://github.com/aunghtetnay/pyonerip/releases)
