# Use node.js image as base
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install 

# Copy everything
COPY . .

# Expose the port specified in the .env file 
ENV PORT=${PORT}
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]
