import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node, Edge, useNodesState, useEdgesState, addEdge, Connection, OnConnect, ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { X, Layout, Grid, EyeOff, RefreshCw } from 'lucide-react';

interface InteractiveDiagramProps {
  onClose: () => void;
  careerData?: {
    degreeNow: string;
    achievements: string;
    skillsNow: string;
    domain: string;
  };
}

interface CareerPathResponse {
  career_goal: string;
  education_path: {
    current_education: string;
    next_steps: string[];
    certifications: string[];
    skills_to_learn: string[];
  };
  career_progression: {
    entry_level: string[];
    mid_level: string[];
    senior_level: string[];
  };
  success: boolean;
  message: string;
}

const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ onClose, careerData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [layoutMode, setLayoutMode] = useState<'layered' | 'radial'>('layered');
  const [showGrid, setShowGrid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<CareerPathResponse | null>(null);
  const [visibleBranchCount, setVisibleBranchCount] = useState<number>(2);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const truncate = useCallback((text: string, max = 24) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  }, []);

  const generateCareerPath = useCallback(async () => {
    if (!careerData) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8004/api/generate-career-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education_details: careerData.degreeNow,
          achievements: careerData.achievements,
          skills: careerData.skillsNow,
          domain_of_interest: careerData.domain,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: CareerPathResponse = await response.json();
      
      if (data.success) {
        setGeneratedData(data);
        createDiagram(data);
      } else {
        throw new Error(data.message || 'Failed to generate career path');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating career path:', err);
    } finally {
      setIsLoading(false);
    }
  }, [careerData]);

  const createDiagram = useCallback((data: CareerPathResponse) => {
    const newNodes: Node[] = [
      // Center node (career_goal)
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
      // Education path
      { 
        id: 'education', 
        type: 'default', 
        position: { x: -350, y: 0 }, 
        data: { label: 'Education', fullLabel: 'Education Path' }, 
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
      // Career progression
      { 
        id: 'career', 
        type: 'default', 
        position: { x: 350, y: 0 }, 
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
      // Education children
      { 
        id: 'next-steps', 
        type: 'default', 
        position: { x: -550, y: -120 }, 
        data: { 
          label: 'Next Steps',
          fullLabel: data.education_path.next_steps.join(', ')
        }, 
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
        id: 'skills', 
        type: 'default', 
        position: { x: -550, y: 0 }, 
        data: { 
          label: 'Skills',
          fullLabel: data.education_path.skills_to_learn.join(', ')
        }, 
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
        id: 'certs', 
        type: 'default', 
        position: { x: -550, y: 120 }, 
        data: { 
          label: 'Certifications',
          fullLabel: data.education_path.certifications.join(', ')
        }, 
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
      // Career children
      { 
        id: 'entry-level', 
        type: 'default', 
        position: { x: 550, y: -120 }, 
        data: { 
          label: 'Entry Level',
          fullLabel: data.career_progression.entry_level.join(', ')
        }, 
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
        id: 'mid-level', 
        type: 'default', 
        position: { x: 550, y: 0 }, 
        data: { 
          label: 'Mid Level',
          fullLabel: data.career_progression.mid_level.join(', ')
        }, 
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
        id: 'senior-level', 
        type: 'default', 
        position: { x: 550, y: 120 }, 
        data: { 
          label: 'Senior Level',
          fullLabel: data.career_progression.senior_level.join(', ')
        }, 
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
      }
    ];

    const newEdges: Edge[] = [
      { id: 'e1', source: 'center', target: 'education', style: { stroke: '#AAAAAA', strokeWidth: 3, opacity: 1 } },
      { id: 'e2', source: 'center', target: 'career', style: { stroke: '#AAAAAA', strokeWidth: 3, opacity: 1 } },
      { id: 'e3', source: 'education', target: 'next-steps', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e4', source: 'education', target: 'skills', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e5', source: 'education', target: 'certs', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e6', source: 'career', target: 'entry-level', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e7', source: 'career', target: 'mid-level', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } },
      { id: 'e8', source: 'career', target: 'senior-level', style: { stroke: '#AAAAAA', strokeWidth: 2, opacity: 1 } }
    ];

    // Progressive rendering: limit branches at first
    const limitedNodes = newNodes.filter(n => ['center','education','career'].includes(n.id) ||
      (['next-steps','skills','certs','entry-level','mid-level','senior-level'].includes(n.id) && visibleBranchCount >= 2));
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
    generateCareerPath();
  }, [generateCareerPath]);

  useEffect(() => {
    if (careerData) {
      generateCareerPath();
    }
  }, [careerData, generateCareerPath]);

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
          {careerData ? `${careerData.domain} Career Map` : 'AI/ML Engineer Career Map'}
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
                  case 'next-steps': return generatedData.education_path.next_steps;
                  case 'skills': return generatedData.education_path.skills_to_learn;
                  case 'certs': return generatedData.education_path.certifications || [];
                  case 'entry-level': return generatedData.career_progression.entry_level;
                  case 'mid-level': return generatedData.career_progression.mid_level;
                  case 'senior-level': return generatedData.career_progression.senior_level;
                  default: return null;
                }
              };
              const items = getItems(id);
              if (!items || items.length === 0) return;
              const parent = nodes.find(nn => nn.id === id);
              if (!parent) return;
              const isLeft = id === 'next-steps' || id === 'skills' || id === 'certs';
              const baseX = (parent.position as any).x + (isLeft ? -220 : 220);
              const farX = (parent.position as any).x + (isLeft ? -780 : 780);
              const startY = (parent.position as any).y - 120;
              const newDetailNodes: Node[] = items.map((it, idx) => ({
                id: `${id}-detail-${idx}`,
                type: 'default',
                position: { x: farX, y: startY + idx * 120 },
                data: { label: truncate(it, 42) },
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
            }}
            fitView
            fitViewOptions={{ padding: 0.4, includeHiddenNodes: false }}
            minZoom={0.5}
            maxZoom={2}
            attributionPosition="bottom-left"
            style={{
              background: showGrid ? 'radial-gradient(circle, #555555 1px, transparent 1px)' : '#1C1C1C',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      </ReactFlowProvider>

      {/* Reveal more branches */}
      {generatedData && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => {
              setVisibleBranchCount(c => Math.min(c + 2, 6));
              // Regenerate to append remaining nodes without full remount
              if (generatedData) createDiagram(generatedData);
            }}
            className="px-4 py-2 rounded-lg bg-white text-slate-900 border shadow hover:shadow-md"
          >
            Show more details
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-600">Generating your career map...</p>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!isLoading && !generatedData && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">No Career Data Available</h2>
            <p className="text-lg mb-6">Please provide career information to generate your personalized roadmap.</p>
            <button 
              onClick={regenerateCareerPath}
              className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#555555] text-white rounded-lg font-semibold hover:from-[#555555] hover:to-[#00CED1] transition-all duration-300"
            >
              Generate Career Path
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDiagram;
