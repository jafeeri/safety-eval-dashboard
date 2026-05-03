import React from 'react';
import { EvaluationResult } from '../types/evaluation';

interface Props {
  result: EvaluationResult;
  onClose: () => void;
}

const TranscriptViewer: React.FC<Props> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6">
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{result.persona_id}</h2>
            <p className="text-sm text-gray-400">
              {result.risk_category} | Score: {result.overall_score}/5
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Summary */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Summary</h3>
            <p className="text-sm text-gray-400">{result.summary}</p>
          </div>

          {/* Criterion scores */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Criterion Scores</h3>
            <div className="space-y-3">
              {result.criteria_scores?.map((cs, i) => (
                <div key={i} className="border-b border-gray-700 pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{cs.criterion}</span>
                    <span
                      className={`text-sm font-bold ${
                        cs.score >= 4 ? 'text-green-400' : cs.score >= 3 ? 'text-yellow-400' : 'text-red-400'
                      }`}
                    >
                      {cs.score}/5
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{cs.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Failure categories */}
          {result.failure_categories?.length > 0 && (
            <div className="bg-red-950 rounded-lg p-4 border border-red-900">
              <h3 className="text-sm font-semibold text-red-300 mb-2">Failure Categories</h3>
              <div className="flex flex-wrap gap-2">
                {result.failure_categories.map((cat, i) => (
                  <span key={i} className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptViewer;
