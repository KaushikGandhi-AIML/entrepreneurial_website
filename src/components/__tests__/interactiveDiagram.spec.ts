import { parseJsonStrictForTest, buildFromDataForTest } from '../../testing/interactiveHelpers';

describe('parseJsonStrict', () => {
  it('parses valid JSON with extra prose', () => {
    const content = 'Here is data:\n{"career_goal":"X","education_path":{"current_education":"Y","next_steps":[],"certifications":[],"skills_to_learn":[]},"career_progression":{"entry_level":[],"mid_level":[],"senior_level":[]}}\nThanks';
    const data = parseJsonStrictForTest(content);
    expect(data.career_goal).toBe('X');
  });
  it('throws on invalid JSON', () => {
    expect(() => parseJsonStrictForTest('no json here')).toThrow();
  });
});

describe('buildFromData', () => {
  it('maps schema to nodes/edges with expected ids', () => {
    const data = {
      career_goal: 'AI/ML Engineer',
      education_path: { current_education: 'B.Tech', next_steps: ['A', 'B'], certifications: ['C'], skills_to_learn: ['S1', 'S2'] },
      career_progression: { entry_level: ['E1'], mid_level: ['M1'], senior_level: ['SNR1'] },
    };
    const { nodes, edges } = buildFromDataForTest(data as any);
    const ids = nodes.map((n) => n.id);
    expect(ids).toEqual(expect.arrayContaining(['center', 'edu', 'career', 'next', 'skills', 'entry', 'mid', 'senior']));
    expect(edges.length).toBeGreaterThan(0);
  });
});

