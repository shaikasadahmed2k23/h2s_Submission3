# 🌍 EcoVillage — Carbon Footprint Awareness Platform

> **Hack2Skill Prompt Wars | Challenge 3**
> A gamified 3D web experience that visualizes your carbon footprint as a living, breathing village.

---

## 🎮 What is EcoVillage?

EcoVillage is an interactive Carbon Footprint Awareness Platform built as a gamified experience — inspired by games like Clash of Clans. Instead of showing boring numbers and charts, your daily habits **transform a 3D village in real time.**

- 🏭 High carbon footprint → Dark, smoky, polluted village with factories
- 🌲 Low carbon footprint → Green, thriving village with trees and blue skies

**The goal:** Make people *feel* the impact of their choices, not just read about it.

---

## ✨ Features

- 🎯 **Carbon Habit Quiz** — 5 questions covering Transport, Food, Electricity, Shopping, and Waste
- 🌐 **Live 3D World** — Built with Three.js & React Three Fiber, fully interactive (zoom, drag, rotate)
- 🏆 **Eco-Rank System** — Ranks from "Pollution Overlord" to "Green Guardian" based on your score
- 🤖 **AI Eco-Tips** — Personalized actionable tips generated based on your specific habits
- 📊 **Village Health Score** — Visual progress bar showing how healthy your world is
- 🔄 **Retake Quiz** — Try different choices and watch your village transform instantly

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| 3D Rendering | Three.js + React Three Fiber + Drei |
| Styling | Tailwind CSS |
| AI Tips | Rule-based intelligent suggestion engine |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shaikasadahmed2k23/h2s_Submission3.git

# Navigate into the project
cd h2s_Submission3

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

---

## 🎯 Challenge Vertical

**Challenge 3 — Carbon Footprint Awareness Platform**

### Approach & Logic

1. User answers 5 habit-based questions across key carbon emission categories
2. Each answer is mapped to a carbon score weight (0–200 per category)
3. Total score is calculated out of 1000 — lower is better
4. The 3D village dynamically renders based on score ranges:
   - **0–200** → Eco Champion (lush green world)
   - **201–400** → Green Guardian (thriving village)
   - **401–600** → Carbon Neutral (mixed environment)
   - **601–800** → Polluter (smoky, grey skies)
   - **801–1000** → Pollution Overlord (dark, industrial wasteland)
5. AI tip engine selects personalized suggestions based on the user's worst-scoring categories

### Key Design Decision
Instead of showing mathematical CO2 numbers (which feel abstract), we translate scores into a **visual story** the user can explore in 3D. This drives emotional awareness and behavior change more effectively.

---

## 📁 Project Structure

```
h2s_Submission3/
├── src/
│   ├── components/
│   │   ├── World.jsx        # 3D Three.js village scene
│   │   ├── Quiz.jsx         # 5-question habit assessment
│   │   ├── Dashboard.jsx    # Score, rank, AI tips display
│   │   └── Navbar.jsx       # Navigation with progress steps
│   ├── utils/
│   │   └── calculator.js    # Carbon score calculation logic
│   ├── App.jsx              # Main app flow controller
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── public/
├── README.md
└── package.json
```

---

## 🧪 Testing

The application has been tested for:
- ✅ All 5 quiz question flows and answer combinations
- ✅ Carbon score calculation accuracy across all ranges
- ✅ 3D world rendering for each pollution level
- ✅ AI tip generation for each category
- ✅ Retake quiz flow and state reset
- ✅ Responsive layout across screen sizes

---

## ♿ Accessibility

- High contrast text on dark backgrounds
- Clear visual progress indicators
- Emoji-supported category labels for visual learners
- Simple, jargon-free language throughout the quiz
- Keyboard-navigable quiz interface

---

## 🔐 Security

- No user data is stored or transmitted
- No API keys exposed in client code
- All calculations happen client-side only
- No third-party tracking or analytics

---

## 🌱 Assumptions Made

- Carbon scores are relative weights based on commonly accepted emission factors
- The quiz is designed for general awareness, not scientific-grade measurement
- Tips are curated based on highest-impact lifestyle changes per category
- The 3D village is a metaphorical representation, not a simulation

---

## 👨‍💻 Built By

**Shaik Asad Ahmed**
- GitHub: [@shaikasadahmed2k23](https://github.com/shaikasadahmed2k23)
- LinkedIn: [Shaik Asad Ahmed](https://www.linkedin.com/in/shaik-asad-ahmed-224b9b2a8/)

---

## 📄 License

MIT License — feel free to learn from and build upon this project.

---

*Built with ❤️ for Hack2Skill Prompt Wars — using AI-assisted development with Windsurf*