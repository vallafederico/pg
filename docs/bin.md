# Project Architecture

## Overview

Understanding how the build system works and its components.

## Key Components

### Development Server

- Handles live reload
- Serves bundled files
- Manages WebSocket connections

### Build System

- Bundles JavaScript and CSS
- Processes multiple entry points
- Handles source maps

### API Server

- Serves API routes
- Provides development endpoints
- Manages route documentation

## Configuration

All build settings are managed through `config.ts`
