# Mefinder
Mefinder is a personal decision-making app that builds a profile based on your interests, skills, values, and goals. It helps you compare careers, education, and job opportunities, explaining why each option fits you and showing live job listings tailored to your profile.

Features:

Personal profile — Age, location, interests, dislikes, education, job experience, technical and soft skills, values, priorities, long-term goals, and work preferences (remote/hybrid/on-site, full-time/part-time, working hours).
Conversational profile building — Chat naturally with an AI advisor about yourself. It automatically picks up new details from the conversation and suggests adding them to your profile — you approve each one with a tap.
Decision comparison — Describe a decision and 2–4 options (or let it suggest options based on your profile), and get each one scored as Recommended, Worth Considering, or Least Suitable, with specific pros, cons, and reasoning tied to who you are.
Live job search — Two ways to find real, currently-open job postings pulled from the web: search a specific role and location, or let Mefinder infer suitable roles from your whole profile and find matches for you. Every result links to the original listing.
Decision history — Every analysis is saved automatically so you can revisit past decisions later.
Follow-up check-ins — Mefinder notices when you haven't revisited an older decision and gently asks how it's going.
Bilingual — Full English and Polish support, including AI-generated content.
Private by design — Your profile, chat history, and decision history are saved to your account only; nothing is shared.
How it works

Mefinder is built as a self-contained React app that calls the Claude API directly to power its conversational advisor, decision analysis, and live web-search-based job matching. Your data persists across sessions using per-user key-value storage.

Disclaimer:

Mefinder is a decision-support tool, not a substitute for professional career counseling. Job listings are pulled from live web search and matched by AI — always verify details on the original posting before applying.
