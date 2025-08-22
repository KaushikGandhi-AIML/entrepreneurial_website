import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node, Edge, useNodesState, useEdgesState, addEdge, Connection, OnConnect, ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { X, Layout, Grid, EyeOff, RefreshCw, TrendingUp, Users, BookOpen, Target } from 'lucide-react';

interface ProfessionalInteractiveDiagramProps {
  onClose: () => void;
  professionalData?: {
    currentRole: string;
    experience: string;
    technicalSkills: string;
  };
}

interface ProfessionalCareerPathResponse {
  career_goal: string;
  current_assessment: {
    strengths: string[];
    areas_for_growth: string[];
    market_position: string;
  };
  career_progression: {
    next_role: string[];
    senior_positions: string[];
    leadership_roles: string[];
  };
  skills_development: {
    technical_skills: string[];
    soft_skills: string[];
    certifications: string[];
  };
  success: boolean;
  message: string;
}

const ProfessionalInteractiveDiagram: React.FC<ProfessionalInteractiveDiagramProps> = ({ onClose, professionalData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [layoutMode, setLayoutMode] = useState<'layered' | 'radial'>('layered');
  const [showGrid, setShowGrid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<ProfessionalCareerPathResponse | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [visibleBranchCount, setVisibleBranchCount] = useState<number>(2);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const truncate = (text: string, max = 24) => (text && text.length > max ? text.slice(0, max - 1) + '…' : text);

  const generateProfessionalCareerPath = useCallback(async () => {
    if (!professionalData) {
      console.log('No professional data available');
      return;
    }

    console.log('Starting professional career path generation with data:', professionalData);
    setIsLoading(true);
    setError(null);

    try {
      const requestBody = {
        current_role: professionalData.currentRole,
        experience: professionalData.experience,
        technical_skills: professionalData.technicalSkills,
      };
      
      console.log('Sending API request with body:', requestBody);
      
      const response = await fetch('http://localhost:8004/api/generate-professional-career-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: ProfessionalCareerPathResponse = await response.json();
      console.log('API response data:', data);
      
      if (data.success) {
        setGeneratedData(data);
        createProfessionalDiagram(data);
      } else {
        throw new Error(data.message || 'Failed to generate professional career path');
      }
    } catch (err) {
      console.error('Error in generateProfessionalCareerPath:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [professionalData]);

  const createProfessionalDiagram = useCallback((data: ProfessionalCareerPathResponse) => {
    const newNodes: Node[] = [
      // Center node (career goal)
      { 
        id: 'center', 
        type: 'default', 
        position: { x: 0, y: 0 }, 
        data: { label: truncate(data.career_goal, 36), fullLabel: data.career_goal }, 
        style: { 
          background: '#00CED1', 
          color: 'white', 
          border: '2px solid #00CED1', 
          borderRadius: '12px', 
          padding: '16px', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          width: 200, 
          textAlign: 'center' 
        } 
      },
      // Current Assessment
      { 
        id: 'assessment', 
        type: 'default', 
        position: { x: -400, y: 0 }, 
        data: { label: 'Assessment', fullLabel: 'Current Assessment' }, 
        style: { 
          background: '#555555', 
          color: 'white', 
          border: '2px solid #555555', 
          borderRadius: '12px', 
          padding: '16px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          width: 180, 
          textAlign: 'center' 
        } 
      },
      // Career Progression
      { 
        id: 'progression', 
        type: 'default', 
        position: { x: 400, y: 0 }, 
        data: { label: 'Career', fullLabel: 'Career Progression' }, 
        style: { 
          background: '#1C1C1C', 
          color: 'white', 
          border: '2px solid #1C1C1C', 
          borderRadius: '12px', 
          padding: '16px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          width: 180, 
          textAlign: 'center' 
        } 
      },
      // Skills Development
      { 
        id: 'skills', 
        type: 'default', 
        position: { x: 0, y: 300 }, 
        data: { label: 'Skills', fullLabel: 'Skills Development' }, 
        style: { 
          background: '#00CED1', 
          color: 'white', 
          border: '2px solid #00CED1', 
          borderRadius: '12px', 
          padding: '16px', 
          fontSize: '16px', 
          fontWeight: 'bold', 
          width: 180, 
          textAlign: 'center' 
        } 
      },
      // Assessment children
      { 
        id: 'strengths', 
        type: 'default', 
        position: { x: -600, y: -120 }, 
        data: { label: 'Strengths', fullLabel: data.current_assessment.strengths.join(', ') }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #555555', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'growth', 
        type: 'default', 
        position: { x: -600, y: 0 }, 
        data: { label: 'Growth Areas', fullLabel: data.current_assessment.areas_for_growth.join(', ') }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #555555', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'position', 
        type: 'default', 
        position: { x: -600, y: 120 }, 
        data: { label: 'Market Position', fullLabel: data.current_assessment.market_position }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #555555', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      // Progression children
      { 
        id: 'next-role', 
        type: 'default', 
        position: { x: 600, y: -120 }, 
        data: { label: 'Next Role', fullLabel: data.career_progression.next_role.join(', ') }, 
        style: { 
          background: '#555555', 
          color: 'white', 
          border: '2px solid #555555', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'senior', 
        type: 'default', 
        position: { x: 600, y: 0 }, 
        data: { label: 'Senior Positions', fullLabel: data.career_progression.senior_positions.join(', ') }, 
        style: { 
          background: '#1C1C1C', 
          color: 'white', 
          border: '2px solid #1C1C1C', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'leadership', 
        type: 'default', 
        position: { x: 600, y: 120 }, 
        data: { label: 'Leadership Roles', fullLabel: data.career_progression.leadership_roles.join(', ') }, 
        style: { 
          background: '#000000', 
          color: 'white', 
          border: '2px solid #000000', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      // Skills children
      { 
        id: 'tech-skills', 
        type: 'default', 
        position: { x: -200, y: 450 }, 
        data: { label: 'Technical Skills', fullLabel: data.skills_development.technical_skills.join(', ') }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #00CED1', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'soft-skills', 
        type: 'default', 
        position: { x: 0, y: 500 }, 
        data: { label: 'Soft Skills', fullLabel: data.skills_development.soft_skills.join(', ') }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #00CED1', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      },
      { 
        id: 'certifications', 
        type: 'default', 
        position: { x: 200, y: 450 }, 
        data: { label: 'Certifications', fullLabel: data.skills_development.certifications.join(', ') }, 
        style: { 
          background: '#AAAAAA', 
          color: 'white', 
          border: '2px solid #00CED1', 
          borderRadius: '8px', 
          padding: '12px', 
          fontSize: '14px', 
          width: 160, 
          textAlign: 'center' 
        } 
      }
    ];

    const newEdges: Edge[] = [
      { id: 'e1', source: 'center', target: 'assessment', style: { stroke: '#AAAAAA', strokeWidth: 3, opacity: 1 } },
      { id: 'e2', source: 'center', target: 'progression', style: { stroke: '#AAAAAA', strokeWidth: 3, opacity: 1 } },
      { id: 'e3', source: 'center', target: 'skills', style: { stroke: '#AAAAAA', strokeWidth: 3, opacity: 1 } },
      { id: 'e4', source: 'assessment', target: 'strengths', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e5', source: 'assessment', target: 'growth', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e6', source: 'assessment', target: 'position', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e7', source: 'progression', target: 'next-role', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e8', source: 'progression', target: 'senior', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e9', source: 'progression', target: 'leadership', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e10', source: 'skills', target: 'tech-skills', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e11', source: 'skills', target: 'soft-skills', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e12', source: 'skills', target: 'certifications', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } }
    ];

    const core = ['center','assessment','progression','skills'];
    const limitedNodes = newNodes.filter(n => core.includes(n.id) || visibleBranchCount >= 2);
    const limitedEdges = newEdges.filter(e => limitedNodes.find(n => n.id === e.source) && limitedNodes.find(n => n.id === e.target));
    setNodes(limitedNodes);
    setEdges(limitedEdges);
  }, []);

  const onConnect = useCallback((params: Connection) => addEdge(params, edges), [edges]);

  const toggleLayout = useCallback(() => {
    setLayoutMode(prev => prev === 'layered' ? 'radial' : 'layered');
  }, []);

  const toggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

  const regenerateCareerPath = useCallback(() => {
    generateProfessionalCareerPath();
  }, [generateProfessionalCareerPath]);

  useEffect(() => {
    if (professionalData) {
      generateProfessionalCareerPath();
    }
  }, [professionalData, generateProfessionalCareerPath]);

  useEffect(() => {
    if (nodes.length > 0) {
      const timer = setTimeout(() => {
        const reactFlowElement = document.querySelector('.react-flow');
        if (reactFlowElement) {
          window.dispatchEvent(new Event('resize')); // Force ReactFlow to recalculate
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [nodes.length]);

  return (
    <div className="h-screen bg-gradient-to-br from-[#1C1C1C] to-[#000000] relative antialiased" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', willChange: 'transform' }}>
      {/* Header */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button onClick={onClose} className="p-2 rounded-lg bg-white border shadow-sm hover:shadow-md transition">
          <X className="w-5 h-5" />
        </button>
        <button onClick={toggleLayout} className="p-2 rounded-lg bg-white border shadow-sm hover:shadow-md transition">
          <Layout className="w-5 h-5" />
        </button>
        <button onClick={toggleGrid} className="p-2 rounded-lg bg-white border shadow-sm hover:shadow-md transition">
          {showGrid ? <Grid className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
        <button 
          onClick={regenerateCareerPath} 
          className="p-2 rounded-lg bg-white border shadow-sm hover:shadow-md transition"
          disabled={isLoading}
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-[#00CED1] to-[#555555] px-6 py-2 rounded-full shadow-lg border border-[#00CED1]">
          {professionalData ? `${professionalData.currentRole} Professional Career Map` : 'Professional Career Map'}
        </h1>
      </div>

      {/* Layout Mode Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-gradient-to-r from-[#555555] to-[#1C1C1C] rounded-full text-sm font-medium text-white shadow-sm border border-[#00CED1]">
          {layoutMode === 'layered' ? 'Layered Layout' : 'Radial Layout'}
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* React Flow */}
      <ReactFlowProvider>
        <div className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, n) => {
              if (!generatedData) return;
              const id = n.id;
              if (expanded.has(id)) {
                // Collapse branch - remove detail nodes and edges
                const detailNodeIds = nodes.filter(nn => nn.id.startsWith(`${id}-detail-`)).map(nn => nn.id);
                const detailEdgeIds = edges.filter(e => e.id.startsWith(`${id}-detail-e-`)).map(e => e.id);
                setNodes(prev => prev.filter(nn => !detailNodeIds.includes(nn.id)));
                setEdges(prev => prev.filter(e => !detailEdgeIds.includes(e.id)));
                setExpanded(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(id);
                  return newSet;
                });
                return;
              }
              const getItems = (nid: string): string[] | null => {
                switch (nid) {
                  case 'strengths': return generatedData.current_assessment.strengths;
                  case 'growth': return generatedData.current_assessment.areas_for_growth;
                  case 'position': return [generatedData.current_assessment.market_position];
                  case 'next-role': return generatedData.career_progression.next_role;
                  case 'senior': return generatedData.career_progression.senior_positions;
                  case 'leadership': return generatedData.career_progression.leadership_roles;
                  case 'tech-skills': return generatedData.skills_development.technical_skills;
                  case 'soft-skills': return generatedData.skills_development.soft_skills;
                  case 'certifications': return generatedData.skills_development.certifications;
                  default: return null;
                }
              };
              const items = getItems(id);
              if (!items || items.length === 0) return;
              const parent = nodes.find(nn => nn.id === id);
              if (!parent) return;
              const isLeft = id === 'strengths' || id === 'growth' || id === 'position' || id === 'tech-skills';
              const farX = (parent.position as any).x + (isLeft ? -780 : 780);
              const startY = (parent.position as any).y - 120;
              const newDetailNodes: Node[] = items.map((it, idx) => ({
                id: `${id}-detail-${idx}`,
                type: 'default',
                position: { x: farX, y: startY + idx * 120 },
                data: { label: (it && it.length > 42) ? it.slice(0,41)+'…' : it },
                style: {
                  background: '#2A2A2A',
                  color: 'white',
                  border: '1px solid #4b5563',
                  borderRadius: '8px',
                  padding: '10px',
                  width: 220,
                  textAlign: 'center'
                }
              }));
              const newDetailEdges: Edge[] = items.map((_, idx) => ({
                id: `${id}-detail-e-${idx}`,
                source: id,
                target: `${id}-detail-${idx}`,
                style: { stroke: '#9CA3AF', strokeWidth: 2, opacity: 1 }
              }));
              setNodes(prev => [...prev, ...newDetailNodes]);
              setEdges(prev => [...prev, ...newDetailEdges]);
              setExpanded(prev => new Set(prev).add(id));
              setSelectedNode(n);
            }}
            fitView
            fitViewOptions={{ padding: 0.4, includeHiddenNodes: false }}
            minZoom={0.3}
            maxZoom={2}
            attributionPosition="bottom-left"
            style={{
              background: showGrid ? 'radial-gradient(circle, #555555 1px, transparent 1px)' : '#1C1C1C',
              backgroundSize: '20px 20px'
            }}
          />
      

      {generatedData && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => {
              setVisibleBranchCount(c => Math.min(c + 2, 6));
              if (generatedData) createProfessionalDiagram(generatedData);
            }}
            className="px-4 py-2 rounded-lg bg-white text-slate-900 border shadow hover:shadow-md"
          >
            Show more details
          </button>
        </div>
      )}
        </div>
      </ReactFlowProvider>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600">Generating your professional career map...</p>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!isLoading && !generatedData && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">No Professional Data Available</h2>
            <p className="text-lg mb-6">Please provide professional information to generate your personalized roadmap.</p>
            <button 
              onClick={regenerateCareerPath}
              className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#555555] text-white rounded-lg font-semibold hover:from-[#555555] hover:to-[#00CED1] transition-all duration-300"
            >
              Generate Professional Career Path
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalInteractiveDiagram;
