# Use Node.js 18 LTS Alpine version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --silent

# Install react-scripts globally
RUN npm install react-scripts@5.0.1 -g --silent

# Copy the rest of the application code
COPY . ./

# Start the application
CMD ["npm", "start"]

