export type EvolutionLevel = "bad" | "better" | "good" | "great";

export type MetricValue = {
  before: string;
  after: string;
  improved: boolean;
};

export type EvolutionStep = {
  id: string;
  commitMessage: string;
  branch: string;
  level: EvolutionLevel;
  code: string;
  highlights: number[];
  metrics: MetricValue[];
};

export type Evolution = {
  id: string;
  language: string;
  steps: EvolutionStep[];
};
