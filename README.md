# Chimpphone Backend

Built with Next.js, PostgreSQL, and docker.

# Getting Started

Follow these steps to set up and run the application and database.

## 1. Setup Docker on Your Machine

Ensure that you have Docker and Docker Compose installed. Refer to `./docker-setup.md` for more details.

## 2. Set Environment Variables

Before running the application, you need to set up environment variables. These are defined in the `.env` file located in the root of your repository. Below is a summary of the variables you need to configure:

| Variable          | Description                        | Default Value |
|-------------------|------------------------------------|---------------|
| POSTGRES_USER     | PostgreSQL database username       | dbs-15        |
| POSTGRES_PASSWORD | PostgreSQL database password       | abc           |
| POSTGRES_DB       | Name of the PostgreSQL database    | chimpphone    |
| POSTGRES_PORT     | Port for PostgreSQL database       | 5432          |
| APP_PORT          | Port for the application           | 3000          |
| DATABASE_URL      | Connection string for PostgreSQL   | `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}` |

**NOTE:Postgres User and Database will be created based on the variables set, no prior setup is needed**
Ensure that these variables are correctly set in your `.env` file.

## 3. Start Up the App and Database

To start the app and database containers run:

```
docker-compose up
```

If you change dependencies in `package.json` or `package-lock.json` during development, you'll need to rebuild the Docker image to install the new dependencies inside the container:

```
docker-compose up --build
```

### Access the Application

#### **To access webpage:**
Open your browser and navigate to `http://localhost:{APP_PORT}` to access the application.

#### **To access the postgres db terminal:**

find the name of the container running the **database**:
```
docker ps -a
```
~copy the name of the image running `postgres:13` 


```
docker exec -it {db-container-name} psql -U {POSTGRES_USER} -d {POSTGRES_DB}
```

#### **To access the application terminal:**

~find the name of the container running the **application**:
```
docker ps -a
```

during development if you change code you don't need to stop the containers, it will auto reload!
~copy the name of the image running the **app** 


```
docker exec -it {app-container-name} sh
```

### Stopping and Removing Containers and Volumes

To stop the containers and remove the associated volumes (this will delete the database data), run:
```
docker-compose down --volumes
```

This command stops the containers and removes the volumes, effectively deleting the database data.

If you just want to stop the containers but keep the data in them, run:

```
docker-compose down
```
