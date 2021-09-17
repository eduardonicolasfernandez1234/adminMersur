### Stage 1: build ###
FROM node:alpine3.12 as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies. 
COPY package.json package-lock.json /app/

# Install app dependencies.
#RUN npm install
RUN cd /app && npm set progress=false && npm install
# Copy app files.
COPY . /app

# Build app
RUN cd /app && npm run build -- --output-path=./dist/out

### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
