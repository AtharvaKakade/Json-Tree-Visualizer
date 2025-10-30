# JSON Tree Visualizer

Interactive JSON Tree Visualizer built with React (Vite), Tailwind CSS, and React Flow.

## Features
- JSON input with validation and clear errors
- Visualize JSON as a hierarchical tree (Object, Array, Primitive)
- Color coding: Object (Indigo), Array (Emerald), Primitive (Amber)
- Search by JSON path (e.g., `$.user.name`, `items[0].price`)
- Highlight and pan/zoom to the matched node
- Zoom controls, drag/pan canvas, tooltips on hover
- Bonus: Dark/Light mode, Clear/Reset, click node to copy path, export PNG

## Getting Started
```bash
npm install
npm run dev
```
Then open the local URL printed in your terminal.

## Project Structure
```
src/
  components/
    JsonInput.jsx
    TreeVisualizer.jsx
    SearchBar.jsx
    ModeToggle.jsx
  utils/
    jsonToNodes.js
  App.jsx
  main.jsx
  styles.css
```

## Usage
1. Paste JSON in the left panel and click Visualize.
2. Use the search bar with JSON paths like `$.user.name` or `items[0].price`.
3. Click a node to copy its JSON path.
4. Use zoom controls on the canvas or the Fit View button.
5. Toggle Dark/Light mode from the header.
6. Export the canvas as PNG.

## Notes
- The layout uses a simple DFS-based tree layout that spaces nodes by depth and subtree size.
- Search matches by full JSON path equality with the format used in node ids.
- Built only with React Flow for visualization. No AI APIs or external graph libraries.

## Deploy
- This app is ready for Vercel/Netlify. Build using `npm run build` and deploy the `dist/` folder.

## License
MIT
