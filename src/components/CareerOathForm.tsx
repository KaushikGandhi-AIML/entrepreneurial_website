import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface CareerOathFormProps {
  onBack: () => void;
  onSubmit: (payload: {
    degreeNow: string;
    achievements: string;
    skillsNow: string;
    domain: string;
  }) => void;
}

const CareerOathForm: React.FC<CareerOathFormProps> = ({ onBack, onSubmit }) => {
  const [degreeNow, setDegreeNow] = useState('');
  const [achievements, setAchievements] = useState('');
  const [skillsNow, setSkillsNow] = useState('');
  const [domain, setDomain] = useState('Artificial Intelligence');

  const handleSubmit = () => {
    if (!degreeNow.trim()) {
      alert('Please enter your current degree');
      return;
    }
    onSubmit({ degreeNow, achievements, skillsNow, domain });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white relative">
      <div className="absolute top-6 left-6 z-10">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow-md transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <div className="max-w-3xl mx-auto pt-24 px-6">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">Career Oath</h1>
        <div className="bg-white rounded-2xl border p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Current Degree</label>
              <input 
                value={degreeNow} 
                onChange={(e) => setDegreeNow(e.target.value)} 
                placeholder="e.g., B.Tech Computer Science" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Achievements (comma-separated)</label>
              <input 
                value={achievements} 
                onChange={(e) => setAchievements(e.target.value)} 
                placeholder="e.g., Kaggle silver medal, Hackathon winner, Research paper published" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Technical Skills (comma-separated)</label>
              <input 
                value={skillsNow} 
                onChange={(e) => setSkillsNow(e.target.value)} 
                placeholder="e.g., Python, PyTorch, React, AWS, Docker" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Domain of Interest</label>
              <select 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Blockchain">Blockchain</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Generate Career Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerOathForm;
