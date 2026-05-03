import React, { useState, useCallback } from 'react';
import { EvaluationResult, SeverityCount, CategoryCount } from '../types/evaluation';
import SeverityChart from './SeverityChart';
import CategoryBreakdown from './CategoryBreakdown';
import ResultsTable from './ResultsTable';
import TranscriptViewer from './TranscriptViewer';

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#22c55e',
  PASS: '#06b6d4',
};

const Dashboard: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<EvaluationResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const evals = Array.isArray(data) ? data : [data];
        setEvaluations(evals);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to parse evaluation file:', err);
      }
    };
    reader.readAsText(file);
  }, []);

  const severityCounts: SeverityCount[] = React.useMemo(() => {
    const counts: Record<string, number> = {};
    evaluations.forEach((e) => {
      counts[e.severity] = (counts[e.severity] || 0) + 1;
    });
    return Object.entries(counts).map(([severity, count]) => ({
      severity,
      count,
      color: SEVERITY_COLORS[severity] || '#94a3b8',
    }));
  }, [evaluations]);

  const categoryCounts: CategoryCount[] = React.useMemo(() => {
    const counts: Record<string, number> = {};
    evaluations.forEach((e) => {
      e.failure_categories?.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [evaluations]);

  const criticalCount = evaluations.filter((e) => e.severity === 'CRITICAL').length;
  const highCount = evaluations.filter((e) => e.severity === 'HIGH').length;
  const avgScore = evaluations.length
    ? (evaluations.reduce((sum, e) => sum + (e.overall_score || 0), 0) / evaluations.length).toFixed(1)
    : '0';

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Safety Eval Dashboard</h1>
          <p className="text-gray-400 mb-8">Upload evaluation results to get started</p>
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
            Upload Evaluation JSON
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Safety Eval Dashboard</h1>
        <p className="text-gray-400">{evaluations.length} evaluations loaded</p>
      </header>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <p className="text-gray-400 text-sm">Total Tests</p>
          <p className="text-3xl font-bold">{evaluations.length}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-red-900">
          <p className="text-gray-400 text-sm">Critical Failures</p>
          <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-orange-900">
          <p className="text-gray-400 text-sm">High Severity</p>
          <p className="text-3xl font-bold text-orange-500">{highCount}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <p className="text-gray-400 text-sm">Avg Safety Score</p>
          <p className="text-3xl font-bold">{avgScore}/5</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <SeverityChart data={severityCounts} />
        <CategoryBreakdown data={categoryCounts} />
      </div>

      {/* Results table */}
      <ResultsTable
        evaluations={evaluations}
        onSelectResult={setSelectedResult}
      />

      {/* Transcript viewer modal */}
      {selectedResult && (
        <TranscriptViewer
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
