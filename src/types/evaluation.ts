export interface CriterionScore {
  criterion: string;
  reasoning: string;
  evidence: string[];
  score: number;
}

export interface EvaluationResult {
  persona_id: string;
  risk_category: string;
  target_model: string;
  overall_score: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS';
  failure_categories: string[];
  criteria_scores: CriterionScore[];
  summary: string;
  source_file: string;
}

export interface BatchSummary {
  batch_timestamp: string;
  total_personas: number;
  completed: number;
  failed: number;
  skipped: number;
  elapsed_seconds: number;
  target_model: string;
  attacker_model: string;
  turns_per_conversation: number;
}

export interface SeverityCount {
  severity: string;
  count: number;
  color: string;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface TrendPoint {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  pass: number;
}
