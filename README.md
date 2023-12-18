
# SWAPI Cache Server using Redis


## Overview

This repository contains a Node.js and Express-based server designed to enhance the performance of the Star Wars API (SWAPI) by leveraging Redis for efficient data caching. Redis, being an in-memory data store, significantly improves response times and reduces server load, resulting in an enhanced user experience.

swapi docs: https://swapi.dev/

## Why Redis for Caching?

Redis excels at handling frequently accessed data with low-latency read operations, making it an ideal choice for caching API responses. The decision to use Redis is rooted in its ability to provide high-performance caching, ensuring optimal responsiveness.

## Functionality

### Supported Endpoints

1. **Get All Resources:**
   - Endpoint: `GET /api/{resource}`
   - Example: [http://localhost:3000/api/people](http://localhost:3000/api/people)
   - Retrieves a list of all resources for a specified type (e.g., people, films, planets).

2. **Get Resource by ID:**
   - Endpoint: `GET /api/{resource}/{id}`
   - Example: [http://localhost:3000/api/people/1](http://localhost:3000/api/people/1)
   - Retrieves a specific resource by its ID.

3. **Search Resource:**
   - Endpoint: `GET /api/{resource}?search={search}`
   - Example: [http://localhost:3000/api/people?search=Luke](http://localhost:3000/api/people?search=Luke)
   - Searches for resources based on a provided search query.

### Supported SWAPI Resources

- Films
- People
- Planets
- Species
- Starships
- Vehicles

## Endpoints

Local endpoints for testing:
- [http://localhost:3000/api/{resource}](http://localhost:3000/api/{resource})
- [http://localhost:3000/api/{resource}/{id}](http://localhost:3000/api/{resource}/{id})
- [http://localhost:3000/api/{resource}?search={search}](http://localhost:3000/api/{resource}?search={search})

## Additional Features

- **Cron Job:**
  - The server includes a daily cron job scheduled at midnight to clear the Redis cache. This ensures that cached data remains up-to-date and reflects changes from the SWAPI.

## Deployment

This server has been deployed on [Render](https://render.com/), providing a scalable and reliable hosting platform.

## Getting Started

1. Clone this repository.
2. Install dependencies: `npm install`
3. Run the server: `npm start`
4. Access the API locally: [http://localhost:3000/api/{resource}](http://localhost:3000/api/{resource})

Feel free to explore and utilize the caching capabilities of this SWAPI Cache Server!

**Note:** Make sure to have Node.js, npm, and Redis installed on your system. Ensure the Node version >=16.18.1 for best experience.



### Installation

Provide step-by-step instructions on how to install and set up the project.

```bash
git clone https://github.com/shammirbaig/swapi.git
cd your-project
npm install

npm start => to run the project locally
