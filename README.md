# Safety Eval Dashboard

A React/TypeScript dashboard for visualizing AI safety evaluation results. Displays test outcomes, failure patterns, severity distributions, and trend analysis from automated red teaming pipelines.

Built to pair with [llm-red-team-eval-framework](https://github.com/YOUR_USERNAME/llm-red-team-eval-framework) — it reads the JSON output from evaluation runs and renders it into an actionable dashboard.

## Features

- **Severity Overview** — At-a-glance view of CRITICAL/HIGH/MEDIUM/LOW/PASS distribution
- **Failure Category Breakdown** — Which safety categories have the most failures
- **Per-Persona Results** — Drill down into individual persona test outcomes
- **Transcript Viewer** — Read full conversation transcripts with highlighted failure points
- **Trend Tracking** — Compare results across evaluation runs to measure improvement
- **Export** — Generate PDF reports from dashboard views

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Vite for build tooling

## Quick Start

```bash
npm install
npm run dev
```

Load evaluation results by dropping a JSON file from the eval framework or connecting to the API endpoint.

## Screenshots

Dashboard shows severity distribution, failure categories, and per-persona drill-down views.

## Integration

The dashboard expects evaluation JSON in this format:

```typescript
interface EvaluationResult {
  persona_id: string;
  risk_category: string;
  overall_score: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS';
  failure_categories: string[];
  criteria_scores: CriterionScore[];
  summary: string;
}
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run linter
```
