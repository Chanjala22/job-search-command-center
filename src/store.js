import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      jobs: [],
      
      addJob: (job) => set((state) => ({ 
        jobs: [...state.jobs, { ...job, id: crypto.randomUUID(), dateAdded: new Date().toISOString() }] 
      })),
      
      updateJobStatus: (id, newStatus) => set((state) => ({
        jobs: state.jobs.map((job) => 
          job.id === id ? { ...job, status: newStatus } : job
        )
      })),

      deleteJob: (id) => set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id)
      }))
    }),
    {
      name: 'job-storage',
    }
  )
);

export default useStore;