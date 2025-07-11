FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies
RUN npm install && npm cache clean --force

# Copy source code
COPY . .

# Accept build arguments
ARG GEMINI_API_KEY

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]