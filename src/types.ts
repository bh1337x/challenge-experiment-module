export type Iteration = {
  id: string;
  title: string;
  selection: 'short' | 'medium' | 'long' | null;
};

export type Module = {
  isLocked: boolean;
  iterations: Iteration[];
};
