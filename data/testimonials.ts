export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  contentTr: string
  contentEn: string
  rating: number
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmet Yıldız',
    role: 'CEO',
    company: 'TechVibe',
    contentTr: 'Pointcraft ile çalışmak harika bir deneyimdi. Sosyal medya stratejileri ile marka bilinirliğimiz %200 arttı. Profesyonel ve yaratıcı ekipleri ile her zaman çalışmak bir ayrıcalık.',
    contentEn: 'Working with Pointcraft was an amazing experience. Our brand awareness increased by 200% with their social media strategies. It\'s always a privilege to work with their professional and creative team.',
    rating: 5,
    avatar: '/images/avatars/avatar1.jpg',
  },
  {
    id: '2',
    name: 'Elif Kaya',
    role: 'Marketing Director',
    company: 'FoodFlow',
    contentTr: 'Yazılım projemizi zamanında ve bütçemiz dahilinde teslim ettiler. E-ticaret platformumuz sayesinde online satışlarımız %150 arttı. Teknik uzmanlıkları gerçekten üst düzey.',
    contentEn: 'They delivered our software project on time and within budget. Our online sales increased by 150% thanks to our e-commerce platform. Their technical expertise is truly top-notch.',
    rating: 5,
    avatar: '/images/avatars/avatar2.jpg',
  },
  {
    id: '3',
    name: 'Can Demir',
    role: 'Founder',
    company: 'GreenLife',
    contentTr: 'AI ile oluşturulan video içeriklerimiz sosyal medyada viral oldu. Pointcraft\'ın yenilikçi yaklaşımı ve teknoloji kullanımı sektörde fark yaratıyor.',
    contentEn: 'Our AI-generated video content went viral on social media. Pointcraft\'s innovative approach and use of technology makes a real difference in the industry.',
    rating: 5,
    avatar: '/images/avatars/avatar3.jpg',
  },
  {
    id: '4',
    name: 'Selin Arslan',
    role: 'COO',
    company: 'FinanceHub',
    contentTr: 'SEO çalışmaları sonucunda Google\'da ilk sayfaya çıktık. Organik trafiğimiz 3 katına çıktı ve dönüşüm oranlarımız %80 arttı. Kesinlikle tavsiye ediyorum.',
    contentEn: 'As a result of SEO work, we reached Google\'s first page. Our organic traffic tripled and our conversion rates increased by 80%. I definitely recommend them.',
    rating: 5,
    avatar: '/images/avatars/avatar4.jpg',
  },
]
