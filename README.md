# 🌳 JSON Tree Visualizer

A fast, modern web application for turning raw **JSON into an interactive, explorable tree visualization**. Built to make complex data structures simple and navigable, this tool is ideal for debugging unfamiliar APIs or understanding deep payloads.

This project was developed as part of the **APIWiz Frontend SDE (I/II/III) Role Assessment**, focusing on translating a technical problem statement into a clean, intuitive, and technically sound solution.

---

## ✨ Key Features & Highlights

* **🌿 Interactive JSON Visualization:** Smooth panning, zooming, and dynamic node connections powered by **React Flow**.
* **🔍 Smart JSONPath Search:** Query nodes using standard JSONPath (e.g., `$.user.name`, `items[0].price`). The view **auto-centers** and highlights the match.
* **🎨 Themed & Exportable:** Includes a **Light/Dark theme toggle** with persistent preference and the ability to **Export the visualization to PNG**.
* **💡 Developer-Friendly UI:** Minimal, clean design with clear visual cues.
* **🔗 Path Utility:** Click any node to **copy its full JSON path** to the clipboard.

---

## 🧠 Motivation & Technical Deep Dive

I've long admired tools like **JSON Crack** and **JSON Hero** for their ability to make data visual and navigable. This project was born from a curiosity to build a similarly smooth experience **from scratch**, learning and implementing key frontend concepts:

* **Graph Rendering:** Mastering React Flow for dynamic node creation and edge linking.
* **Hierarchical Layouts:** Implementing an algorithm to structure nodes logically.
* **Advanced Search:** Developing the logic for JSONPath-based queries, highlighting, and auto-centering the canvas.
* **State Management:** Handling theme toggles, persistent settings, and complex UI states.

Every small interaction—from hover effects to zoom transitions—was tuned until the app felt genuinely useful for real-world debugging scenarios.

---

## 🎯 Assessment Context — APIWiz Frontend SDE Assignment

### Objective
Build an interactive **JSON Tree Visualizer** that allows users to visualize JSON data as a hierarchical tree structure with search and highlighting functionality.

### Core Functional Requirements Met

| Feature | Description | Status |
| :--- | :--- | :--- |
| **JSON Input & Validation** | Text area for input, validation, and a "Visualize" button. | ✅ Mandatory |
| **React Flow Visualization** | Uses **React Flow** exclusively for tree rendering. | ✅ Mandatory |
| **Node Typing & Edges** | Displays structure with parent-child edges and distinct colors for **Objects (Blue/Purple)**, **Arrays (Green)**, and **Primitives (Orange/Yellow)**. | ✅ Mandatory |
| **JSONPath Search** | Search function that highlights the matching node and **auto-centers** the view. | ✅ Mandatory |

### Optional & Bonus Features Implemented

* **Basic Interactive Controls:** Zoom (In/Out/Fit View) and canvas panning.
* **Dark/Light Theme:** Toggle implemented with preference persistence.
* **Copy Node Path:** Click-to-copy functionality.
* **Export as PNG:** Save and share visualization snapshots.

---

## 🛠 Tech Stack

* **Frontend:** **React** + **Vite**
* **Styling:** **Tailwind CSS**
* **Graphing:** **React Flow**
* **Animation:** **Framer Motion** (for subtle UI transitions)
* **Export:** `html-to-image` (for PNG export)
* **Routing:** **React Router** (used for potential future expansion like `/editor`)

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AtharvaKakade/json-tree-visualizer.git](https://github.com/AtharvaKakade/json-tree-visualizer.git)
    cd json-tree-visualizer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## 🚀 Usage Guide

1.  **Input:** Paste or type valid JSON into the text area.
2.  **Render:** Click the **"Visualize"** button to transform the JSON into the interactive tree.
3.  **Search:** Use the search bar to find nodes using **JSONPath** syntax.
4.  **Explore:** Use the mouse to pan the canvas or the controls to zoom/fit the view.
5.  **Utility:** Click any node to **copy its full path**.

> **💡 Tip:** The app features an **auto-optimization** for rendering large JSON payloads to maintain performance.

---

## 🧩 Project Structure

```bash
src/
├── components/       # Reusable UI parts (Header, SearchBar, NodeInfo, etc.)
├── pages/            # LandingPage and EditorPage
├── context/          # Theme & App state context
├── utils/            # JSON parsing, search logic, path utilities
└── main.jsx          # Root entry point

## 👨‍💻 Author & License

**Author:** Atharva Kakade
* *Built with curiosity, care, and a love for clean visualizations.*
* **GitHub Profile →** https://github.com/AtharvaKakade
* **Contact →** `kakadeatharva5@gmail.com`

**License:**
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## 🧾 Submission Notes

* **Submitted For:** APIWiz Frontend SDE Role Assessment
* **Hosted On:** Vercel https://json-tree-visualizer-flame.vercel.app/
* **Repository:** GitHub https://github.com/AtharvaKakade/Json-Tree-Visualizer