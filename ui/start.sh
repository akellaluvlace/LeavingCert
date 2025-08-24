#!/bin/bash

echo "🚀 Starting AI Leaving Certificate Platform..."
echo "📦 Installing dependencies..."

npm install

echo "🔧 Setting up environment..."
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.local .env.local
fi

echo "🌟 Starting development server..."
echo "🔗 Platform will be available at: http://localhost:3000"
echo ""
echo "Demo Accounts:"
echo "Teacher: teacher@demo.ie (password: demo123)"
echo "Student: student@demo.ie (password: demo123)"
echo "Admin: admin@sec.ie (password: demo123)"
echo ""

npm run dev