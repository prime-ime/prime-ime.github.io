export type Lang = 'zh';
export const defaultLang: Lang = 'zh';
export const ui = {
  zh: {
    home: '首页', research: '研究方向', publications: '论文成果', people: '团队成员', projects: '科研项目', news: '新闻动态', join: '加入我们', search: '搜索',
    all: '查看全部', explore: '探索研究方向', learn: '了解更多', back: '返回列表', skip: '跳转到主要内容', menu: '导航菜单',
    researchIntro: '从工业系统的物理规律出发，探索数据与智能的协同。',
    publicationsIntro: '记录我们在工业建模、能源预测与人工智能交叉领域的研究。',
    peopleIntro: '连接工业问题与智能方法，一起探索更可信的预测。',
    projectsIntro: '面向工业能源场景，探索从建模方法到实际应用的路径。',
    newsIntro: '在这里关注论文进展、学术交流与团队动态。',
    joinIntro: '对工业能源与人工智能的交叉研究感兴趣？期待与你一起探索。',
    searchIntro: '查找研究方向、论文、成员与课题组动态。',
    pending: '内容整理中', emptyPapers: '论文列表待更新', emptyPapersBody: '经核实的论文与相关资源将在这里按年份发布。',
    emptyFeatured: '代表性成果待更新', emptyFeaturedBody: '我们将在这里展示已确认的代表性论文与研究成果。',
    emptyProjects: '科研项目待更新', emptyProjectsBody: '项目介绍、技术成果与公开资源将在确认后发布。',
    emptyNews: '最新动态待发布', emptyNewsBody: '后续将在这里分享论文录用、学术报告与科研进展。',
    emptyPeople: '成员信息待公布', emptyPeopleBody: '经确认的成员介绍、照片与个人主页将在这里展示。',
    faculty: '导师', phd: '博士生', master: '硕士生', alumni: '毕业成员',
    paper: '论文', code: '代码', website: '项目主页', profile: '个人主页', bib: '引用 BibTeX', download: '下载 BibTeX',
    future: '面向能源未来，\n构建可信智能。', heroLead: '让工业系统更可理解，\n让能源未来更可预测。',
    heroBody: '我们关注工业能源系统中的建模与预测问题，探索深度学习与物理机理的融合，让数据与领域知识共同驱动研究。',
    aboutLabel: '关于 PRIME', aboutTitle: '从物理规律出发，\n向数据深处探索。',
    aboutBody: 'PRIME Lab 依托新疆大学计算机科学与技术学院，由苏雷副教授指导，聚焦工业建模与能源预测。我们以工业能源系统为研究对象，围绕深度学习建模、时序预测、物理机理与数据融合展开研究。',
    researchTitle: '连接机理、数据与预测', featured: '代表性成果', latest: '实验室动态',
    joinTitle: '让好奇心，\n与真实问题相遇。', joinBody: '欢迎关注工业建模、能源预测及深度学习的同学了解我们的研究方向。具体招生信息以正式发布为准。',
    illustration: '工业能源预测概念示意，曲线为视觉表达，不代表实验数据。',
    contact: '联系与招生', email: '联系邮箱', address: '办公地址', unannounced: '待公布', admissions: '招生信息',
    admissionNotice: '苏雷副教授招收计算机科学与技术、计算机技术专业硕士研究生。欢迎通过公开工作邮箱联系；具体名额、报名要求及时间以新疆大学当年正式招生通知为准。',
    preparation: '了解我们的研究', preparationBody: '你可以先阅读研究方向，思考感兴趣的工业场景与建模问题；已发表论文及相关代码可在论文成果页面查看。',
    openSource: '开放资源', openSourceBody: '公开代码和可复用资源将在课题组 GitHub 组织中发布。',
    updatedSoon: '相关资料将在确认后更新。', imagePending: '照片待提供', noTranslation: '此条目尚未提供中文版本，以下保留原始内容。',
  },
} as const;
export function t(lang: Lang) { return ui[lang]; }
export function href(_lang: Lang, path = '') { return `/${path ? path.replace(/^\/+|\/+$/g, '') + '/' : ''}`; }
export function local<T extends { lang: Lang }>(entries: Array<{ data: T }>, lang: Lang) { return entries.filter(e => e.data.lang === lang); }
