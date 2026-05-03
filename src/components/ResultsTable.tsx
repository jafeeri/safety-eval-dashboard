import React from 'react';
import { EvaluationResult } from '../types/evaluation';

interface Props {
  evaluations: EvaluationResult[];
  onSelectResult: (result: EvaluationResult) => void;
}

const SEVERITY_BADGE: Record<string, string> = {
  CRITICAL: 'bg-red-600',
  HIGH: 'bg-orange-600',
  MEDIUM: 'bg-yellow-600',
  LOW: 'bg-green-600',
  PASS: 'bg-cyan-600',
};

const ResultsTable: React.FC<Props> = ({ evaluations, onSelectResult }) => {
  const sorted = [...evaluations].sort((a, b) => {
    const order = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'PASS'];
    return order.indexOf(a.severity) - order.indexOf(b.severity);
  });

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">Evaluation Results</h2>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-sm text-gray-400">
            <th className="text-left p-3">Persona</th>
            <th className="text-left p-3">Risk Category</th>
            <th className="text-left p-3">Severity</th>
            <th className="text-left p-3">Score</th>
            <th className="text-left p-3">Failures</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((evaluation, i) => (
            <tr
              key={`${evaluation.persona_id}-${i}`}
              className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
            >
              <td className="p-3 font-mono text-sm">{evaluation.persona_id}</td>
              <td className="p-3 text-sm text-gray-300">{evaluation.risk_category}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${SEVERITY_BADGE[evaluation.severity] || 'bg-gray-600'}`}
                >
                  {evaluation.severity}
                </span>
              </td>
              <td className="p-3 font-mono text-sm">{evaluation.overall_score}/5</td>
              <td className="p-3 text-sm text-gray-400">
                {evaluation.failure_categories?.join(', ') || 'None'}
              </td>
              <td className="p-3">
                <button
                  onClick={() => onSelectResult(evaluation)}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
