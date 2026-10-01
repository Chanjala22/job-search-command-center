import { useState } from 'react';
import useStore from '../store';
import { PlusCircle } from 'lucide-react';

export default function JobForm() {
  const addJob = useStore((state) => state.addJob);
  const [formData, setFormData] = useState({ company: '', role: '', status: 'Applied' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.role) {
      setError('Company and Role are required.');
      return;
    }
    addJob(formData);
    setFormData({ company: '', role: '', status: 'Applied' });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 flex gap-4 items-end flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input 
          type="text"
          className="w-full border-gray-300 border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          placeholder="e.g. Google"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input 
          type="text"
          className="w-full border-gray-300 border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          placeholder="e.g. Frontend Developer"
        />
      </div>
      <div className="w-48">
        <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
        <select 
          className="w-full border-gray-300 border rounded-md p-2 bg-white"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
      >
        <PlusCircle size={18} /> Add Job
      </button>
      {error && <p className="text-red-500 text-sm w-full mt-2">{error}</p>}
    </form>
  );
}