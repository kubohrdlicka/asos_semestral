# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install the Nest CLI globally (optional but useful for dev)
RUN npm install -g @nestjs/cli

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "start:dev"]