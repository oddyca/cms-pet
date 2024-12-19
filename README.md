# Blog With A Dashboard

## Overview
This is a web application designed for managing and analyzing blog posts. It provides a user-friendly interface for viewing, creating, and editing posts, along with basic analytics on post performance.

## Tech Stack
**Frontend:**
  - React;
  - TypeScript;
  - Redux Toolkit;
  - React Query;
  - React Router;
  - MDXEditor;
  - Tailwind;
  - Tremor.

**Backend:**
  - Strapi: A headless CMS that provides a RESTful API for managing content.

## Features
**Sign in into the dashboard**
**Dashboard:** 
  - Displays an overview of post statistics, including views and top categories.
  
**Post Management:**
  - Create, edit, and delete posts with a rich text editor;
  - Save drafts;
  - View published posts and drafts in separate sections.

**Blog post views tracker**

**Pre-fetch data with react router**

**Cache fetched data with react query**

**Redux-toolkit store for state management**

**Filter posts by categories with a dropdown menu**

## Getting Started
**To get started, follow these steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/oddyca/cms-pet.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cms-pet
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm run start
   ```
   or
   ```bash
   npm run dev
   ```
5. Access the application:
   Go to `http://localhost:5173`.

**To run the backend part of the project, create new terminal and follow these steps:**

1. Clone the Strapi CMS repository
```
bash
git clone https://github.com/oddyca/cms-pet-strapi.git
```
2. Navigate to the project directory:
   ```bash
   cd cms-pet
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm run start
   ```
   or
   ```bash
   npm run develop
   ```

If needed, access the Strapi admin panel:
   Go to `http://localhost:1337/admin`.

