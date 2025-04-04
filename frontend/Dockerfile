# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the built app
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000