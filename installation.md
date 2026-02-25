# STRUCTURE FOR A SOLO CREATIVE DEVELOPER

Structure the guide in this exact order:

1. Project initialization

* Use create-next-app@latest
* Select TypeScript, ESLint, Tailwind, App Router
* Include exact terminal commands

2. Clean default setup

* Show which files to remove
* Provide minimal Home page example

3. Install 3D dependencies

* three
* @react-three/fiber
* @react-three/drei
* @gsap/react
* lenis

4. Install and configure Sanity

* Install Sanity CLI
* Initialize new project
* Create dataset
* Generate API token
* Add environment variables

5. Create folder architecture
   Show recommended structure:

app/
components/
components/3d/
components/ui/
components/layout/
features/
lib/
types/
public/models/
public/videos/
public/images/
sanity/

6. Sanity client setup

* Create lib/sanity.client.ts
* Show complete code
* Use environment variables

7. Create basic Sanity schema

* Project schema with title, slug, excerpt, coverImage
* Show full schema code

8. GROQ queries

* Query all projects
* Query single project by slug

9. Dynamic route example

* app/work/[slug]/page.tsx
* Full working code example

10. Basic 3D hero example

* Client component
* React Three Fiber canvas
* Dynamic import in homepage

11. Development workflow

* Run Next.js
* Run Sanity studio

12. Production build

* Build command
* Start command

13. Deployment on Vercel

* CLI deploy
* Add environment variables

Output rules:

* Use clear step by step structure
* Include terminal commands
* Include complete copy-paste code blocks
* Keep explanations short
* Focus on production best practices
* Include 3D performance recommendations
* Assume reader is intermediate developer

Do not include unnecessary theory.
Do not skip any required setup step.
