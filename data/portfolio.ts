export interface Project {
  id: string
  titleTr: string
  titleEn: string
  descriptionTr: string
  descriptionEn: string
  category: string
  image: string
  tags: string[]
  gradient: string
  glowColor: string
}

export const projects: Project[] = [
  {
    id: '1',
    titleTr: 'Seyyahsema - Uluslararası Turizm Şirketi',
    titleEn: 'seyyahsema - International Tourism Company',
    descriptionTr: 'Seyyahsema Uluslararası Turizm ve Danışmanlık Şirketi için web sitesi tasarımı ve görsel tasarım çalışmalarını gerçekleştirdik.',
    descriptionEn: 'We carried out the website design and visual design works for Seyyahsema International Tourism and Consultancy Company.',
    category: 'socialMedia',
    image: '/images/portfolio/project1.jpg',
    tags: [''],
    gradient: 'linear-gradient(135deg, #F6BC0D 0%, #FDCB35 100%)',
    glowColor: 'rgba(246, 188, 13, 0.3)',
  },
  {
    id: '2',
    titleTr: 'Keskul - Yardım Derneği',
    titleEn: 'Keskul - Aid Association',
    descriptionTr: 'Keşkül Uluslararası Yardım Derneği için kapsamlı ve modern bir full-stack web sitesi geliştirdik.',
    descriptionEn: 'We developed a comprehensive and modern full-stack website for Keşkül International Aid Association.',
    category: 'software',
    image: '/images/portfolio/project2.jpg',
    tags: [''],
    gradient: 'linear-gradient(135deg, #00D4AA 0%, #34E8C4 100%)',
    glowColor: 'rgba(0, 212, 170, 0.3)',
  },
  {
    id: '3',
    titleTr: 'Autolimmat AG - Galeri',
    titleEn: 'Autolimmat AG - Gallery',
    descriptionTr: 'Autolimmat AG galerisi için web sitesi tasarımı ve yapay zekâ destekli video içeriklerini hazırladık.',
    descriptionEn: 'We prepared the website design and artificial intelligence supported video content for Autolimmat AG gallery.',
    category: 'video',
    image: '/images/portfolio/project3.jpg',
    tags: [''],
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
    glowColor: 'rgba(255, 107, 53, 0.3)',
  },
  {
    id: '4',
    titleTr: 'Keskul Ch - Help Organization',
    titleEn: 'Keskul Ch - Help Organization',
    descriptionTr: 'Keskul Ch - Help Organization için web sitesi tasarımı ve yapay zekâ destekli video içeriklerini hazırladık.',
    descriptionEn: 'We prepared the website design and artificia l intelligence supported video content for Keskul Ch - Help Organization.',
    category: 'software',
    image: '/images/portfolio/project4.jpg',
    tags: [''],
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
    glowColor: 'rgba(255, 107, 53, 0.3)',
  },
]
