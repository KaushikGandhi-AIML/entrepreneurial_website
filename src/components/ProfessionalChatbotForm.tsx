import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Award, Code } from 'lucide-react';

interface ProfessionalChatbotFormProps {
  onBack: () => void;
  onSubmit: (payload: {
    currentRole: string;
    experience: string;
    technicalSkills: string;
  }) => void;
}

const ProfessionalChatbotForm: React.FC<ProfessionalChatbotFormProps> = ({ onBack, onSubmit }) => {
  const [currentRole, setCurrentRole] = useState('');
  const [experience, setExperience] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState('');

  const handleSubmit = () => {
    if (!currentRole.trim()) {
      alert('Please enter your current role');
      return;
    }
    if (!experience.trim()) {
      alert('Please enter your experience');
      return;
    }
    if (!technicalSkills.trim()) {
      alert('Please enter your technical skills');
      return;
    }
    onSubmit({ currentRole, experience, technicalSkills });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white relative">
      <div className="absolute top-6 left-6 z-10">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow-md transition">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-24 px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Professional Career Advisor</h1>
          <p className="text-lg text-slate-600">Get personalized career guidance for your professional journey</p>
        </div>

        <div className="bg-white rounded-2xl border p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Role */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Current Role/Position
              </label>
              <input 
                value={currentRole} 
                onChange={(e) => setCurrentRole(e.target.value)} 
                placeholder="e.g., Senior Software Engineer, Data Scientist, Product Manager" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
            
            {/* Experience */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Professional Experience & Achievements
              </label>
              <textarea 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)} 
                placeholder="e.g., 5+ years in software development, Led team of 8 developers, Successfully delivered 15+ projects, Mentored junior developers" 
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
              />
            </div>
            
            {/* Technical Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Technical Skills & Technologies
              </label>
              <input 
                value={technicalSkills} 
                onChange={(e) => setTechnicalSkills(e.target.value)} 
                placeholder="e.g., Python, React, AWS, Docker, Kubernetes, Machine Learning, Agile methodologies" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
            
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Generate Professional Career Map
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-semibold text-emerald-800 mb-2">What You'll Get:</h3>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Personalized career progression roadmap</li>
            <li>• Skills development recommendations</li>
            <li>• Next career move suggestions</li>
            <li>• Industry-specific guidance</li>
            <li>• Interactive visual career map</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalChatbotForm;
