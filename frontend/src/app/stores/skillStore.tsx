import { create } from 'zustand';

export interface Skills {
    id: string;
    name: string;
}

interface SkillsStore {
    skill: Skills[];
    categorizedSkills: Record<string, Skills[]>;
    // eslint-disable-next-line no-unused-vars
    setSkill: (skills: Skills[]) => void;
    // eslint-disable-next-line no-unused-vars
    categorizeSkill: (skill: Skills) => string;
}

export const skillsStore = create<SkillsStore>((set, get) => ({
    skill: [],
    categorizedSkills: {},
    setSkill: (skills) => {
        set({ skill: skills });

        const categorized: Record<string, Skills[]> = {};
        skills.forEach((s) => {
            const category = get().categorizeSkill(s);
            if (!categorized[category]) categorized[category] = [];
            categorized[category].push(s);
        });

        set({ categorizedSkills: categorized });
    },
    categorizeSkill: (skill) => {
        if (
            skill.name.includes('React') ||
            skill.name.includes('Vue') ||
            skill.name.includes('HTML') ||
            skill.name.includes('CSS') ||
            skill.name.includes('JavaScript') ||
            skill.name.includes('TypeScript') ||
            skill.name.includes('Next.js') ||
            skill.name.includes('Vite') ||
            skill.name.includes('Redux') ||
            skill.name.includes('Tailwind') ||
            skill.name.includes('Styled-components') ||
            skill.name.includes('REST API') ||
            skill.name.includes('Axios')
        )
            return 'Frontend';
        if (
            skill.name.includes('Node') ||
            skill.name.includes('Express') ||
            skill.name.includes('Java') ||
            skill.name.includes('SpringBoot') ||
            skill.name.includes('Node.js') ||
            skill.name.includes('Express') ||
            skill.name.includes('Python') ||
            skill.name.includes('Django') ||
            skill.name.includes('Flask') ||
            skill.name.includes('MySQL') ||
            skill.name.includes('PostgreSQL') ||
            skill.name.includes('MongoDB') ||
            skill.name.includes('Redis') ||
            skill.name.includes('JWT') ||
            skill.name.includes('OAuth') ||
            skill.name.includes('JPA') ||
            skill.name.includes('MyBatis')
        )
            return 'Backend';
        if (
            skill.name.includes('Figma') ||
            skill.name.includes('Adobe XD') ||
            skill.name.includes('Sketch') ||
            skill.name.includes('PhotoShop') ||
            skill.name.includes('Illustrator') ||
            skill.name.includes('Web Design') ||
            skill.name.includes('Mobile UI,UX') ||
            skill.name.includes('프로토타입') ||
            skill.name.includes('반응형 디자인') ||
            skill.name.includes('사용자 경험') ||
            skill.name.includes('Design System') ||
            skill.name.includes('Zeplin') ||
            skill.name.includes('Branding') ||
            skill.name.includes('Component Design') ||
            skill.name.includes('Framer') ||
            skill.name.includes('After Effects') ||
            skill.name.includes('Blender') ||
            skill.name.includes('Cinema 4D') ||
            skill.name.includes('Maya') ||
            skill.name.includes('ZBrush') ||
            skill.name.includes('InDesign') ||
            skill.name.includes('Unity') ||
            skill.name.includes('Webflow')
        )
            return 'Design';
        if (
            skill.name.includes('Notion') ||
            skill.name.includes('Figma') ||
            skill.name.includes('Miro') ||
            skill.name.includes('Jira') ||
            skill.name.includes('Confluence') ||
            skill.name.includes('Google Analytics') ||
            skill.name.includes('Agile') ||
            skill.name.includes('Scrum') ||
            skill.name.includes('Wireframe') ||
            skill.name.includes('UX Research') ||
            skill.name.includes('User Flow') ||
            skill.name.includes('프로덕트 기획') ||
            skill.name.includes('서비스 전략') ||
            skill.name.includes('데이터 기반 기획') ||
            skill.name.includes('기획 문서 작성') ||
            skill.name.includes('Roadmapping') ||
            skill.name.includes('A/B Testing') ||
            skill.name.includes('SQL')
        )
            return 'PM';
        if (
            skill.name.includes('AWS') ||
            skill.name.includes('EC2') ||
            skill.name.includes('S3') ||
            skill.name.includes('RDS') ||
            skill.name.includes('CloudFront') ||
            skill.name.includes('Docker') ||
            skill.name.includes('Nginx') ||
            skill.name.includes('GitHub Actions') ||
            skill.name.includes('CI/CD') ||
            skill.name.includes('Kubernetes') ||
            skill.name.includes('Terraform') ||
            skill.name.includes('Monitering') ||
            skill.name.includes('Grafana') ||
            skill.name.includes('Prometheus') ||
            skill.name.includes('ELK Stack') ||
            skill.name.includes('SSL') ||
            skill.name.includes('도메인 설정') ||
            skill.name.includes('배포 자동화')
        )
            return 'DevOps';
        return 'Others';
    },
}));
