This project can be started using Yarn:

To install Yarn, you need to have Node.js installed on your system because Yarn is a package manager that depends on Node.js and npm (Node Package Manager). Here's how to install Yarn on different operating systems:

### Windows

1. **Via Installer:**
   - Download the Yarn installer from the [official Yarn website](https://classic.yarnpkg.com/en/docs/install/#windows-stable).
   - Run the installer and follow the instructions to complete the installation.

2. **Via npm:**
   - If you have Node.js and npm already installed, you can install Yarn using npm by running the following command in your command prompt:
     ```bash
     npm install --global yarn
     ```

### macOS

1. **Via Homebrew:**
   - If you have Homebrew installed, you can easily install Yarn by running the following command in your terminal:
     ```bash
     brew install yarn
     ```
   - If you don't have Node.js installed, Homebrew will install it as a dependency of Yarn.

2. **Via npm:**
   - If you have Node.js and npm already installed, you can install Yarn using npm by running the following command in your terminal:
     ```bash
     npm install --global yarn
     ```

### Linux

1. **Via Debian/Ubuntu (APT) Package Manager:**
   - First, configure the Yarn APT repository by running the following commands:
     ```bash
     curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     ```
   - Then, update your package list and install Yarn:
     ```bash
     sudo apt update && sudo apt install yarn
     ```
   - Note: If you don't want Node.js installed as a dependency, you can run `sudo apt install --no-install-recommends yarn`.

2. **Via npm:**
   - If you have Node.js and npm already installed, you can install Yarn using npm by running the following command:
     ```bash
     npm install --global yarn
     ```

### Verifying Installation

After installing Yarn, you can verify it by running:

```bash
yarn --version
```

This command should display the version of Yarn installed on your system, indicating that Yarn has been successfully installed.

### Note

- The instructions above may change as new versions of Yarn are released, so it's a good idea to check the [official Yarn installation guide](https://classic.yarnpkg.com/en/docs/install/) for the most up-to-date instructions.
- Yarn has two versions: Classic (1.x) and Berry (2.x). The instructions provided here are for Yarn Classic. If you're interested in Yarn Berry, you can find more information on the [official Yarn website](https://yarnpkg.com/).

### Installing Dependencies for the Server

1. Open your terminal and navigate to the server directory within your project:

    ```bash
    cd path/to/your/project/server
    ```

2. Run the following command to install the server dependencies as defined in the `package.json` file located in the server directory:

    ```bash
    yarn install
    ```

### Installing Dependencies for the Client

1. After you've installed the server dependencies, navigate to the client directory:

    ```bash
    cd ../client  # Assuming the client folder is at the same level as the server folder
    ```

    Adjust the path according to your project's structure if necessary.

2. Install the client dependencies with Yarn:

    ```bash
    yarn install
    ```

### Running the Project

#Requires 2 terminals:
- Server: To run the server, while in the server directory, start it with:

    ```bash
    yarn start
    ```

- Client: Similarly, to run the client, navigate to the client directory and start it with:

    ```bash
    yarn start
    ```
