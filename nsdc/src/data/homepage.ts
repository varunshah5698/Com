export const SITE_URL = 'https://djs-infomatrix.vercel.app';

export type Domain = {
  id: string;
  name: string;
  short: string;
  description: string;
  color: string;
  index: string;
};

export const domains: Domain[] = [
  { id: 'ai', name: 'Artificial Intelligence', short: 'AI', description: 'Explore intelligent systems, language models, and the questions behind responsible AI.', color: '#2CA6FF', index: '01' },
  { id: 'ml', name: 'Machine Learning', short: 'ML', description: 'Turn patterns in data into models you can test, improve, and put to work.', color: '#7443FF', index: '02' },
  { id: 'data', name: 'Data Science', short: 'DS', description: 'Find the story inside complex data through analysis, experimentation, and visualization.', color: '#4DE3D0', index: '03' },
  { id: 'finance', name: 'Computational Finance', short: 'CF', description: 'Apply computation and quantitative thinking to financial questions and markets.', color: '#FFC247', index: '04' },
  { id: 'web', name: 'Web Development', short: 'WEB', description: 'Build digital products from the first sketch to a working application.', color: '#FF7A1A', index: '05' },
  { id: 'design', name: 'UI/UX Design', short: 'UX', description: 'Make technology clearer, more useful, and more human through thoughtful design.', color: '#FF4FA3', index: '06' },
];

export type Project = {
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  github: string;
  visual: 'assistant' | 'market' | 'vision' | 'impact';
  color: string;
};

export const projects: Project[] = [
  {
    index: '01', category: 'Artificial Intelligence', title: 'AI Chatbot for Customer Support',
    description: 'A responsive support assistant built to understand queries and make everyday help more efficient.',
    tags: ['Node.js', 'MongoDB', 'Dialogflow'], href: `${SITE_URL}/projects/66916a33b89f833da2e16578`,
    github: 'https://github.com/DJS-INFOMATRIX', visual: 'assistant', color: '#2CA6FF',
  },
  {
    index: '02', category: 'Computational Finance', title: 'Financial Dashboard for Stock Analysis',
    description: 'Market data made legible through live insights, interactive charts, and visual analysis.',
    tags: ['Data visualization', 'Finance', 'Dashboard'], href: `${SITE_URL}/projects/669168d1b89f833da2e16567`,
    github: 'https://github.com/DJS-INFOMATRIX/Computational-Finance/', visual: 'market', color: '#4DE3D0',
  },
  {
    index: '03', category: 'Machine Learning', title: 'Image Recognition Model',
    description: 'A TensorFlow experiment that identifies objects and turns visual data into useful predictions.',
    tags: ['TensorFlow', 'Computer vision', 'Python'], href: `${SITE_URL}/projects/66916721b89f833da2e16549`,
    github: 'https://github.com/DJS-INFOMATRIX/Computational-Finance/tree/main/Machine%20Learning', visual: 'vision', color: '#7443FF',
  },
  {
    index: '04', category: 'Web Development', title: 'Charity Website',
    description: 'A digital home for a charitable mission, its initiatives, and the people who want to contribute.',
    tags: ['Web app', 'Community', 'Design'], href: `${SITE_URL}/projects/66915fe599a0f7e09ac18302`,
    github: 'https://github.com/DJS-INFOMATRIX/Web-App-Development/tree/main/Charity_Website', visual: 'impact', color: '#FF7A1A',
  },
];

export type Insight = {
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
  color: string;
};

export const insights: Insight[] = [
  { category: 'Artificial Intelligence', title: 'From Algorithms to Intuition: Common Sense in AI', author: 'Dev Parekh', date: '04 Jul 2024', readTime: '5 min read', href: `${SITE_URL}/blogs/66867917eda16c1707c6251f`, color: '#2CA6FF' },
  { category: 'Cloud Computing', title: 'Cloud Wars: AWS vs. GCP vs. Azure', author: 'Dev Parekh', date: '04 Jul 2024', readTime: '13 min read', href: `${SITE_URL}/blogs/66867b63eda16c1707c6252f`, color: '#7443FF' },
  { category: 'Machine Learning', title: 'Climate Modelling with Machine Learning', author: 'Pranav Pawar', date: '04 Jul 2024', readTime: '7 min read', href: `${SITE_URL}/blogs/66868201eda16c1707c6253c`, color: '#4DE3D0' },
];

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Projects', href: '#projects' },
  { label: 'Insights', href: '#insights' },
  { label: 'Team', href: `${SITE_URL}/team` },
];
