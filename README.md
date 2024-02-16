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
