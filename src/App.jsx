import JobForm from './components/JobForm';
import KanbanBoard from './components/KanbanBoard';
import useStore from './store';
import { Briefcase } from 'lucide-react';

function App() {
  const jobs = useStore((state) => state.jobs);
  
  const totalJobs = jobs.length;
  const activeInterviews = jobs.filter(j => j.status === 'Interviewing').length;

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="text-blue-600" /> Job Search Command Center
            </h1>
            <p className="text-gray-500 mt-1">Track and manage your internship/job applications</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100">
              <span className="block text-sm text-gray-500">Total Applications</span>
              <span className="font-bold text-xl text-gray-800">{totalJobs}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100">
              <span className="block text-sm text-gray-500">Active Interviews</span>
              <span className="font-bold text-xl text-blue-600">{activeInterviews}</span>
            </div>
          </div>
        </header>

        <main>
          <JobForm />
          <KanbanBoard />
        </main>
        
      </div>
    </div>
  );
}

export default App;