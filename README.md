# 🌍 EcoVillage — Carbon Footprint Awareness Platform

> **Hack2Skill Prompt Wars | Challenge 3**
> A gamified 3D web experience that visualizes your carbon footprint as a living, breathing village.

---

## 🎮 What is EcoVillage?

EcoVillage is an interactive Carbon Footprint Awareness Platform built as a gamified experience — inspired by games like Clash of Clans. Instead of showing boring numbers and charts, your daily habits **transform a 3D village in real time.**

- 🏭 High carbon footprint → Dark, smoky, polluted village with factories
- 🌲 Low carbon footprint → Green, thriving village with solar panels, wind turbines and blue skies

**The goal:** Make people *feel* the impact of their choices, not just read about it.

<div align="center">

**[🌐 Live Demo → https://h2s-submission3.vercel.app/]**


</div>

---

## ✨ Features

- 🎯 **Carbon Habit Quiz** — 10 questions covering Transport, Food, Electricity, Shopping, Waste, Water, Diet, Renewable Energy, Air Travel, and Recycling
- 🌐 **Live 3D World** — Built with Three.js & React Three Fiber, fully interactive (zoom, drag, rotate)
- 🌱 **Dynamic Infrastructure** — Solar panels and wind turbines appear in your village when score is below 400
- 🎞️ **Smooth Animations** — Village transforms with smooth pollution interpolation as score changes
- 🏆 **Eco-Rank System** — Ranks from "Pollution Overlord" to "Green Guardian" based on your score
- 🤖 **AI Eco-Tips** — Personalized actionable tips generated based on your specific habits
- 📊 **Village Health Score** — Visual progress bar showing how healthy your world is
- 🌳 **Carbon Offset Tip** — Shows exactly how many trees you need to plant to neutralize your footprint
- 📤 **Share Your Village** — One click copies your eco-rank and score as a shareable message
- 📱 **Fully Mobile Responsive** — Works beautifully on all screen sizes
- 🔄 **Retake Quiz** — Try different choices and watch your village transform instantly

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| 3D Rendering | Three.js + React Three Fiber + Drei |
| Styling | Tailwind CSS |
| Testing | Vitest + Testing Library + jest-dom |
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

### Run Tests

```bash
npm run test
```

52 tests across 3 test suites — all passing ✅

### Build for Production

```bash
npm run build
```

---

## 🎯 Challenge Vertical

**Challenge 3 — Carbon Footprint Awareness Platform**

### Approach & Logic

1. User answers 10 habit-based questions across key carbon emission categories
2. Each answer is mapped to a carbon score weight (0–100 per category)
3. Total score is calculated out of 1000 — lower is better
4. The 3D village dynamically renders based on score ranges:
   - **0–200** → Eco Champion (lush green world, solar panels, wind turbines)
   - **201–400** → Green Guardian (thriving village with renewable energy)
   - **401–600** → Carbon Neutral (mixed environment)
   - **601–800** → Polluter (smoky, grey skies)
   - **801–1000** → Pollution Overlord (dark, industrial wasteland)
5. AI tip engine selects personalized suggestions based on the user's worst-scoring categories
6. Carbon offset calculator shows trees needed to neutralize the footprint

### Key Design Decision
Instead of showing mathematical CO2 numbers (which feel abstract), we translate scores into a **visual story** the user can explore in 3D. This drives emotional awareness and behavior change more effectively.

---

## 📁 Project Structure

```
h2s_Submission3/
├── src/
│   ├── components/
│   │   ├── World.jsx              # 3D Three.js village scene
│   │   ├── Quiz.jsx               # 10-question habit assessment
│   │   ├── Dashboard.jsx          # Score, rank, AI tips, share button
│   │   └── Navbar.jsx             # Navigation with progress steps
│   ├── utils/
│   │   └── calculator.js          # Carbon score calculation logic
│   ├── components/
│   │   ├── calculator.test.js     # 42 unit tests for calculator
│   │   ├── Quiz.test.jsx          # 4 component tests for Quiz
│   │   └── Dashboard.test.jsx     # 6 component tests for Dashboard
│   ├── setupTests.js              # jest-dom test setup
│   ├── App.jsx                    # Main app flow controller
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── public/
├── README.md
└── package.json
```

---

## 🧪 Testing

52 tests across 3 test suites — all passing.

### calculator.test.js (42 tests)
- ✅ All 5 score ranges (0–200 through 801–1000)
- ✅ Each question category (transport, food, electricity, shopping, waste, water, diet, renewable, air travel, recycling)
- ✅ Edge cases (empty answers, minimum score, maximum score)
- ✅ All eco-rank labels and boundary scores
- ✅ AI tips array length, uniqueness, category prioritization
- ✅ Village health percentage and pollution factor math

### Quiz.test.jsx (4 tests)
- ✅ Renders first question and progress header
- ✅ All questions appear correctly
- ✅ Answer selection works
- ✅ Completes quiz and calls onComplete with all answers

### Dashboard.test.jsx (6 tests)
- ✅ Score displays correctly
- ✅ Eco-rank label is accurate
- ✅ Village health percentage renders
- ✅ Exactly 3 AI tips render as a list
- ✅ Retake button works
- ✅ Share button copies to clipboard

```bash
npm run test
# Tests  52 passed (52)
```

---

## ♿ Accessibility

- High contrast text on dark backgrounds
- Clear visual progress indicators throughout quiz
- Emoji-supported category labels for visual learners
- Simple, jargon-free language throughout
- Keyboard-navigable quiz interface
- Mobile responsive across all screen sizes

---

## 🔐 Security

- No user data is stored or transmitted
- No API keys exposed in client code
- All calculations happen client-side only
- No third-party tracking or analytics
- HTTP method validation on all interactions

---

## 🌱 Assumptions Made

- Carbon scores are relative weights based on commonly accepted emission factors
- The quiz is designed for general awareness, not scientific-grade measurement
- Tips are curated based on highest-impact lifestyle changes per category
- The 3D village is a metaphorical representation, not a simulation
- Carbon offset tree calculation based on average 21kg CO2 absorbed per tree per year

---

## 👨‍💻 Built By

**Shaik Asad Ahmed**
- GitHub: [@shaikasadahmed2k23](https://github.com/shaikasadahmed2k23)
- LinkedIn: [Shaik Asad Ahmed](https://www.linkedin.com/in/shaik-asad-ahmed-224b9b2a8/)

---

## 📄 License

MIT License — feel free to learn from and build upon this project.

---

*Built with ❤️ for Hack2Skill Prompt Wars — using AI-assisted development with Windsurf & GitHub Copilot*
```
