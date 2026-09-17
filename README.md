# Safety Eval Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)

**A React and TypeScript dashboard for reading AI safety evaluation results. Drop in the JSON from a red-team run and it shows severity distribution, failure categories, a worst-first results table, and per-result detail, so findings are actionable instead of buried in a JSON file.**

It pairs with the [LLM Red Team Evaluation Framework](https://github.com/jafeeri/llm-red-team-eval-framework): that tool produces the evaluation JSON, this one visualizes it. It also reads anything matching the same shape.

> Want to see it without any data of your own? Run it and click **Load sample data**. A bundled example dataset renders the full dashboard.

---

## What you get

- **Summary cards** - total tests, critical failures, high-severity count, average safety score.
- **Severity distribution** - CRITICAL / HIGH / MEDIUM / LOW / PASS as a colored bar chart.
- **Failure categories** - which safety categories fail most, sorted.
- **Results table** - every evaluation, sorted worst-first, click through for detail.
- **Detail view** - per-criterion scores with the judge's reasoning and the failure categories for one result.

## Prerequisites

[Node.js](https://nodejs.org/) 18 or newer (includes npm). No other setup.

## Install and run

```bash
git clone https://github.com/jafeeri/safety-eval-dashboard.git
cd safety-eval-dashboard
npm install

npm run dev       # start the dev server (hot reload) at http://localhost:5173
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve the production build locally
```

Open the dev URL, then either **Upload Evaluation JSON** or click **Load sample data**.

## Loading your own results

The dashboard accepts a single evaluation object or an array of them. Use the JSON
written by the eval framework's `judge.py` (or produce the same shape yourself):

```typescript
interface EvaluationResult {
  persona_id: string;
  risk_category: string;
  target_model: string;
  overall_score: number;                 // 1..5
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS';
  failure_categories: string[];
  criteria_scores: { criterion: string; reasoning: string; evidence: string[]; score: number }[];
  summary: string;
  source_file: string;
}
```

A ready-made example lives at `public/sample-evaluations.json`, which is what the
**Load sample data** button loads.

## Tech stack

- React 18 + TypeScript, built with Vite 5.
- Tailwind CSS for styling.
- Charts are hand-rolled with divs and Tailwind (no charting dependency), so the
  bundle stays small and there is nothing extra to configure.

## Project layout

```
index.html                 Vite entry
src/main.tsx               React entry, renders <Dashboard/>
src/index.css              Tailwind directives
src/components/            Dashboard, SeverityChart, CategoryBreakdown, ResultsTable, TranscriptViewer
src/types/evaluation.ts    Shared TypeScript types
public/sample-evaluations.json  Example dataset for the demo button
```

## Honest limits

- It reads results; it does not run evaluations. Generate the JSON with the eval
  framework (or any tool that emits the shape above).
- The "detail view" shows criterion scores and reasoning. It does not render full
  raw conversation transcripts, since the evaluation JSON does not include them.
- Everything runs client-side in the browser. Nothing is uploaded anywhere.

## License

MIT, see [LICENSE](LICENSE). Copyright (c) 2026 Ali Mehdi Jafeeri.
