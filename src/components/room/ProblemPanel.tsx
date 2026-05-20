import { Badge } from '../ui/Badge';

export const ProblemPanel = () => {
  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 text-left border-b border-[#2D3149]">
      {/* Title & Difficulty */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
          4. Median of Two Sorted Arrays
        </h1>
        <Badge variant="error" label="Hard" />
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 select-none">
        {['Array', 'Binary Search', 'Divide and Conquer'].map((tag) => (
          <span 
            key={tag} 
            className="bg-[#1A1D27] border border-[#2D3149] text-[#908fa0] px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="text-xs text-[#908fa0] leading-relaxed space-y-3">
        <p>
          Given two sorted arrays <code className="bg-[#1A1D27] border border-[#2D3149] px-1 py-0.5 rounded font-mono text-[#6366F1]">nums1</code> and <code className="bg-[#1A1D27] border border-[#2D3149] px-1 py-0.5 rounded font-mono text-[#6366F1]">nums2</code> of size <code className="bg-[#1A1D27] border border-[#2D3149] px-1 py-0.5 rounded font-mono text-[#6366F1]">m</code> and <code className="bg-[#1A1D27] border border-[#2D3149] px-1 py-0.5 rounded font-mono text-[#6366F1]">n</code> respectively, return the median of the two sorted arrays.
        </p>
        <p>
          The overall run time complexity should be <code className="bg-[#1A1D27] border border-[#2D3149] px-1 py-0.5 rounded font-mono text-[#00a6e0]">O(log (m+n))</code>.
        </p>
      </div>

      {/* Example Block */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white mb-2">Example 1</h3>
          <div className="bg-[#0F1117] border border-[#2D3149] p-4 rounded-[4px] font-mono text-xs space-y-1">
            <div className="text-[#e4e1ed]">
              <span className="text-[#908fa0]">Input:</span> nums1 = [1,3], nums2 = [2]
            </div>
            <div className="text-[#e4e1ed]">
              <span className="text-[#908fa0]">Output:</span> 2.00000
            </div>
            <div className="text-[#908fa0] italic mt-2">
              <span className="text-[#908fa0] not-italic font-semibold">Explanation:</span> merged array = [1,2,3] and median is 2.
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div>
          <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white mb-2">Constraints</h3>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-[#908fa0] font-mono">
            <li>nums1.length == m</li>
            <li>nums2.length == n</li>
            <li>0 ≤ m, n ≤ 1000</li>
            <li>1 ≤ m + n ≤ 2000</li>
            <li>-10<sup>6</sup> ≤ nums1[i], nums2[i] ≤ 10<sup>6</sup></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;
