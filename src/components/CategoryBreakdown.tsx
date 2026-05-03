import React from 'react';
import { CategoryCount } from '../types/evaluation';

interface Props {
  data: CategoryCount[];
}

const CategoryBreakdown: React.FC<Props> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Failure Categories</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No failures detected</p>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <span className="text-sm w-40 text-gray-400 truncate" title={item.category}>
                {item.category}
              </span>
              <div className="flex-1 bg-gray-800 rounded-full h-5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-500"
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-mono w-6 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
