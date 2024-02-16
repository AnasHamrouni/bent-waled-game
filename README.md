# Project Setup Guide

Welcome to the setup guide for this project. This document will walk you through the steps to get the project up and running on your local machine using Yarn for dependency management.

## Prerequisites

Before you begin, ensure that you have **Node.js** installed on your system, as Yarn is a Node.js-based package manager. If Node.js is not installed, download and install it from [Node.js official website](https://nodejs.org/).

## Installing Yarn

Yarn is a fast, reliable, and secure dependency management tool. Follow the instructions below to install Yarn on your machine:

### For Windows Users:

- **Using the Installer:**
  1. Download the Yarn installer from the [Yarn official website](https://classic.yarnpkg.com/en/docs/install/#windows-stable).
  2. Run the installer and follow the on-screen instructions.

- **Using npm:**
  If Node.js and npm are already installed, you can add Yarn globally via npm:
  ```bash
  npm install --global yarn
  ```

### For macOS Users:

- **Using Homebrew:**
  If you have Homebrew installed, simply run:
  ```bash
  brew install yarn
  ```
  Homebrew will also install Node.js if it's not already installed.

- **Using npm:**
  Alternatively, use npm to install Yarn globally:
  ```bash
  npm install --global yarn
  ```

### For Linux Users:

- **Using the APT Package Manager (Debian/Ubuntu):**
  Configure the Yarn repository and install Yarn with:
  ```bash
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt update && sudo apt install yarn
  ```
  To avoid installing Node.js, use `sudo apt install --no-install-recommends yarn`.

- **Using npm:**
  If npm is available, install Yarn globally:
  ```bash
  npm install --global yarn
  ```

### Verifying Yarn Installation

Confirm Yarn is installed by checking its version:
```bash
yarn --version
```

## Setting Up the Project

This project consists of separate client and server components, each with its own dependencies.

### Setting Up the Server

1. Navigate to the server directory:
   ```bash
   cd path/to/project/server
   ```
2. Install server dependencies:
   ```bash
   yarn install
   ```

### Setting Up the Client

1. Navigate to the client directory:
   ```bash
   cd path/to/project/client
   ```
2. Install client dependencies:
   ```bash
   yarn install
   ```

## Running the Project

You'll need two terminal instances to run the client and server simultaneously.

- **Server**:
  In the server directory, start the server with:
  ```bash
  yarn start
  ```

- **Client**:
  In the client directory, start the React app with:
  ```bash
  yarn start
  ```

The client should now be running and accessible in your browser, typically at `http://localhost:3000`, and the server will be listening for requests.

## Notes

- The provided installation commands are for Yarn Classic (v1.x). For Yarn Berry (v2.x), refer to the [Yarn official documentation](https://yarnpkg.com/).
- For the most up-to-date installation instructions and troubleshooting, visit the [Yarn Installation Guide](https://classic.yarnpkg.com/en/docs/install/).

We hope this guide helps you set up the project smoothly. Happy coding!