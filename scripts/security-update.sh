#!/bin/bash

# Security Update Script for pyonerip
# This script helps fix security vulnerabilities

echo "🔒 PyoneRip Security Update Script"
echo "================================="

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "📋 Current npm audit status:"
npm audit --audit-level moderate

echo ""
echo "🔄 Updating package-lock.json with security fixes..."
rm -f package-lock.json node_modules -rf
npm install

echo ""
echo "🔍 Running security audit after updates..."
npm audit --audit-level high

echo ""
echo "🔧 Attempting automatic fixes..."
npm audit fix

echo ""
echo "📊 Final security audit:"
npm audit --audit-level moderate

echo ""
echo "✅ Security update process completed!"
echo ""
echo "📝 Next steps:"
echo "1. Review the audit results above"
echo "2. Commit the updated package.json and package-lock.json"
echo "3. Push to trigger the security scan in CI/CD"
echo "4. If vulnerabilities persist, consider manual updates or security patches"

echo ""
echo "🐳 To test locally with Docker:"
echo "docker build -t pyonerip:test ."
echo "docker run --rm -p 3000:3000 pyonerip:test"