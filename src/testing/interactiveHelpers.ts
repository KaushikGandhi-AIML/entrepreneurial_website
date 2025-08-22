// Testable helpers duplicated from InteractiveDiagram (pure logic only)

export interface CareerDataTest {
  career_goal: string;
  education_path: { current_education: string; next_steps: string[]; certifications?: string[]; skills_to_learn: string[] };
  career_progression: { entry_level: string[]; mid_level: string[]; senior_level: string[] };
}

export function parseJsonStrictForTest(content: string): CareerDataTest {
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Invalid JSON');
  const json = content.substring(start, end + 1);
  return JSON.parse(json) as CareerDataTest;
}

export function buildFromDataForTest(data: CareerDataTest): { nodes: any[]; edges: any[] } {
  const nodes: any[] = [];
  const edges: any[] = [];
  nodes.push({ id: 'center' });
  nodes.push({ id: 'edu' });
  nodes.push({ id: 'career' });
  nodes.push({ id: 'next' });
  nodes.push({ id: 'skills' });
  if (data.education_path.certifications?.length) nodes.push({ id: 'certs' });
  nodes.push({ id: 'entry' });
  nodes.push({ id: 'mid' });
  nodes.push({ id: 'senior' });
  const pushE = (a: string, b: string) => edges.push({ source: a, target: b });
  pushE('center', 'edu');
  pushE('center', 'career');
  pushE('edu', 'next');
  pushE('edu', 'skills');
  if (data.education_path.certifications?.length) pushE('edu', 'certs');
  pushE('career', 'entry');
  pushE('career', 'mid');
  pushE('career', 'senior');
  return { nodes, edges };
}

