export interface BlogPost {
  id: string
  slug: string
  titleTr: string
  titleEn: string
  excerptTr: string
  excerptEn: string
  category: string
  image: string
  author: string
  date: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: '2024-sosyal-medya-trendleri',
    titleTr: '2024\'te Bilmeniz Gereken 10 Sosyal Medya Trendi',
    titleEn: '10 Social Media Trends You Need to Know in 2024',
    excerptTr: 'Sosyal medya dünyası hızla değişiyor. İşte 2024 yılında markanızı öne çıkaracak en önemli trendler ve stratejiler.',
    excerptEn: 'The social media world is changing rapidly. Here are the most important trends and strategies that will make your brand stand out in 2024.',
    category: 'socialMedia',
    image: '/images/blog/blog1.jpg',
    author: 'Zeynep Aydın',
    date: '2024-03-15',
    readTime: 8,
  },
  {
    id: '2',
    slug: 'seo-rehberi',
    titleTr: 'SEO Başlangıç Rehberi: Google\'da Üst Sıralara Çıkmak',
    titleEn: 'SEO Beginner\'s Guide: Ranking at the Top of Google',
    excerptTr: 'SEO nedir, nasıl yapılır? Teknik SEO, içerik optimizasyonu ve link building stratejileri hakkında kapsamlı bir rehber.',
    excerptEn: 'What is SEO and how to do it? A comprehensive guide on technical SEO, content optimization, and link building strategies.',
    category: 'seo',
    image: '/images/blog/blog2.jpg',
    author: 'Baran Öztürk',
    date: '2024-03-10',
    readTime: 12,
  },
  {
    id: '3',
    slug: 'ai-video-uretimi',
    titleTr: 'AI ile Video Üretimi: Geleceğin İçerik Stratejisi',
    titleEn: 'AI Video Production: The Content Strategy of the Future',
    excerptTr: 'Yapay zeka destekli video üretim araçları ve bunları marka iletişiminde nasıl etkili kullanabileceğiniz.',
    excerptEn: 'AI-powered video production tools and how you can effectively use them in brand communication.',
    category: 'technology',
    image: '/images/blog/blog3.jpg',
    author: 'Emre Karaca',
    date: '2024-03-05',
    readTime: 10,
  },
  {
    id: '4',
    slug: 'dijital-reklam-roi',
    titleTr: 'Dijital Reklamda ROI Nasıl Artırılır?',
    titleEn: 'How to Increase ROI in Digital Advertising?',
    excerptTr: 'Google Ads ve Meta Ads kampanyalarınızda yatırım getirinizi maksimize etmek için uygulamanız gereken stratejiler.',
    excerptEn: 'Strategies you need to implement to maximize your return on investment in Google Ads and Meta Ads campaigns.',
    category: 'marketing',
    image: '/images/blog/blog4.jpg',
    author: 'İlayda Güneş',
    date: '2024-02-28',
    readTime: 7,
  },
]
