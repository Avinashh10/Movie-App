# Movie Wishlist App

A full-stack web application that allows users to browse movies, add them to a personal wishlist, and manage their favorites. Built with **React** (frontend), **Node.js/Express** (backend), and **MongoDB** (database).

---

## Table of Contents

1. [Features](#features)  
2. [Technologies](#technologies)  
3. [Setup and Installation](#setup-and-installation)  
4. [Database Setup](#database-setup)  
5. [Environment Variables](#environment-variables)  
6. [API Documentation](#api-documentation)  
7. [Additional Notes](#additional-notes)  

---

## Features

- User authentication with JWT  
- Browse popular movies from TMDB API  
- Add/remove movies to/from wishlist  
- Persistent wishlist across sessions  
- Heart toggle on movie cards  
- Responsive UI with Tailwind CSS  

---

## Technologies

- Frontend: React, Axios, Tailwind CSS, React Router  
- Backend: Node.js, Express, MongoDB, Mongoose  
- Authentication: JWT, bcrypt  
- APIs: TMDB API  

---

## Setup and Installation

### Backend

1. Clone the repo:  
```bash
git clone https://github.com/<your-username>/movie-wishlist-app.git
cd movie-wishlist-app/server
npm install
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
npm run dev


