#!/bin/bash

# Function to install Node.js and npm
install_node() {
  echo "Installing Node.js and npm..."
  sudo apt-get install -y nodejs
  sudo apt-get install -y npm
}

# Function to set up the Node.js application
setup_app() {
  echo "Setting up the Node.js application..."

  # Ensure we're in the project directory
  if [ ! -f server.js ]; then
    echo "Error: server.js not found in the current directory."
    exit 1
  fi

  # Initialize npm if package.json does not exist
  if [ ! -f package.json ]; then
    npm init -y
  fi

  # Install necessary packages
  npm install express axios

  echo "Node.js application setup complete."
}

# Main script execution
main() {
  # Update and install curl if not present
  sudo apt-get update
  sudo apt-get install -y curl

  # Install Node.js and npm
  install_node

  # Set up the Node.js application
  setup_app

  # Provide instructions to run the app
  echo "To run the application, execute the following commands:"
  echo "node server.js"
}

# Execute the main function
main
