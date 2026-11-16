export const SITE = {
  website: 'https://prime-ime.github.io',
  labName: 'PRIME Lab',
  fullName: 'Predictive Research in Industrial Modeling and Energy',
  university: { zh: '新疆大学', en: 'Xinjiang University' },
  name: { zh: '工业建模与能源预测研究组', en: 'Industrial Modeling & Energy Forecasting' },
  description: {
    zh: 'PRIME Lab 是新疆大学工业建模与能源预测研究组，关注工业能源系统、深度学习预测，以及物理机理与数据融合建模。',
    en: 'PRIME Lab at Xinjiang University studies industrial energy systems, deep learning for forecasting, and the integration of physical mechanisms with data-driven modeling.',
  },
  github: 'https://github.com/prime-ime',
  repository: 'https://github.com/prime-ime/prime-ime.github.io',
  // 填入已确认的公开联系方式；空值时页面明确显示“待公布”。
  email: '',
  address: { zh: '', en: '' },
  admissionsUrl: '',
};
export const sections = ['research', 'publications', 'people', 'projects', 'news', 'join', 'search'] as const;
export type Section = typeof sections[number] | 'home';
