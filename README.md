# JSSATEN Student Hub

A React + Vite + Tailwind CSS website for JSS Academy of Technical Education (JSSATEN), Noida. It is a student-focused hub that presents the college and helps visitors find information quickly.

## About the project

JSSATEN Student Hub is a mini project that reimagines the college website as an interactive, single-page experience. It was built to make campus information easier to explore and to give students one place for common tasks.

### Features

- **Full-screen story sections** – About, Students, Research, Careers and Updates, with animated bar and pie charts (intake, gender and state split) and library statistics.
- **Campus content** – Hero, vision and mission, academics, facilities gallery and contact/admissions, each with a campus photo background from the `public` folder.
- **Kashi AI** – a chatbot that answers questions from a local JSSATEN knowledge base (`data.txt`), with key-term suggestions and autocomplete (for example `hostel`, `fee`, `location`).
- **Website Navigator** – jump to any section, or the Student Dashboard, by clicking a button or typing a key term such as `placements` or `contact`.
- **Student dashboard** – academic records, fees, attendance and student details, using clearly labelled fictional demo data.
- **Announcement popup** – highlights important notices such as CIE-2 for 5th semester.

### Tech stack

React, Vite, Tailwind CSS, lucide-react.

### Project structure

- `src/components/` – UI sections, the assistant panel, navigator and student portal
- `src/kashiKnowledgeBase.js` and `data.txt` – knowledge base and search logic for Kashi AI
- `src/data.js` – navigation links and demo student data
- `public/` – campus images and logo

> Student records are fictional demo data. Verify fees, admissions and other facts against the official college website.

## Live website

[https://jss-website-kashiai.vercel.app](https://jss-website-kashiai.vercel.app)

## Run locally

Install [Node.js](https://nodejs.org/) if it is not already installed. From the project folder, run:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```
