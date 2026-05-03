import React from 'react';
import { SeverityCount } from '../types/evaluation';

interface Props {
  data: SeverityCount[];
}

const SeverityChart: React.FC<Props> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Severity Distribution</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.severity} className="flex items-center gap-3">
            <span className="text-sm w-20 text-gray-400">{item.severity}</span>
            <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${total > 0 ? (item.count / total) * 100 : 0}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <span className="text-sm font-mono w-8 text-right">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityChart;
