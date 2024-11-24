# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Set the PORT environment variable from the build argument
ARG PORT
ENV PORT=${PORT}

# Copy package.json and package-lock.json from app directory
COPY app/package*.json ./

# Install dependencies, including dev dependencies
RUN npm install

# Copy the rest of your application code from app directory
COPY app/ .

# Expose the port specified in .env
EXPOSE ${PORT}

# Default command (will be overridden by docker-compose for dev)
CMD ["npm", "start"]
