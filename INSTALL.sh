#!/bin/bash

# Adaptive Fitness Chatbot - Installation Script
# This script automates the setup process

echo "🏋️  Adaptive Fitness Chatbot - Installation Script"
echo "=================================================="
echo ""

# Check Node.js version
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js version should be 20.x or higher. Current: $(node -v)"
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB or use MongoDB Atlas."
fi

echo "✅ Prerequisites check completed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "✅ Backend dependencies installed"
echo ""

# Setup environment files
echo "⚙️  Setting up environment files..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from template"
    echo "⚠️  IMPORTANT: Edit backend/.env and add your OpenAI API key!"
else
    echo "ℹ️  backend/.env already exists"
fi

# Frontend .env
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env from template"
else
    echo "ℹ️  .env already exists"
fi

echo ""
echo "=================================================="
echo "✨ Installation completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env and add your OpenAI API key"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend (in new terminal): npm start"
echo ""
echo "📚 For detailed instructions, see SETUP_GUIDE.md"
echo "=================================================="
