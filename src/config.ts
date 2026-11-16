export const SITE = {
  website: 'https://prime-ime.github.io',
  labName: 'PRIME Lab',
  fullName: 'Predictive Research in Industrial Modeling and Energy',
  university: { zh: '新疆大学' },
  name: { zh: '工业建模与能源预测研究组' },
  description: {
    zh: 'PRIME Lab 是新疆大学工业建模与能源预测研究组，关注工业能源系统、深度学习预测，以及物理机理与数据融合建模。',
  },
  github: 'https://github.com/prime-ime',
  repository: 'https://github.com/prime-ime/prime-ime.github.io',
  // 公开工作邮箱及教师主页，经学院官网核实。
  email: 'sul@xju.edu.cn',
  address: { zh: '' },
  admissionsUrl: 'https://it.xju.edu.cn/info/1144/3136.htm',
};
export const sections = ['research', 'publications', 'people', 'projects', 'news', 'join', 'search'] as const;
export type Section = typeof sections[number] | 'home';
