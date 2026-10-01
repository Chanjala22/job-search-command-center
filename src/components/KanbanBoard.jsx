import useStore from '../store';
import { Trash2 } from 'lucide-react';

const COLUMNS = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

export default function KanbanBoard() {
  const { jobs, updateJobStatus, deleteJob } = useStore();

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('jobId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, status) => {
    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) updateJobStatus(jobId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {COLUMNS.map((column) => (
        <div 
          key={column}
          className="bg-gray-100 rounded-lg p-4 min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
        >
          <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
            {column} 
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
              {jobs.filter(j => j.status === column).length}
            </span>
          </h3>
          
          <div className="flex flex-col gap-3">
            {jobs
              .filter((job) => job.status === column)
              .map((job) => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job.id)}
                  className="bg-white p-4 rounded-md shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{job.role}</h4>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    <button 
                      onClick={() => deleteJob(job.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Delete job"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    Added: {new Date(job.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}