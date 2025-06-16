# Use an official Node.js runtime as a base image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the application
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that the application will be served on
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]