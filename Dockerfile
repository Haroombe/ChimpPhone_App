# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Set the PORT environment variable from the build argument
ARG PORT
ENV PORT=${PORT}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port specified in .env
EXPOSE ${PORT}

# Default command (will be overridden by docker-compose for dev)
CMD ["npm", "start"]