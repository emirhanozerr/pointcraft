export interface TeamMember {
  id: string
  name: string
  roleTr: string
  roleEn: string
  avatar: string
  socials: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Emre Karaca',
    roleTr: 'Kurucu & CEO',
    roleEn: 'Founder & CEO',
    avatar: '/images/team/team1.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: '2',
    name: 'Zeynep Aydın',
    roleTr: 'Kreatif Direktör',
    roleEn: 'Creative Director',
    avatar: '/images/team/team2.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    id: '3',
    name: 'Baran Öztürk',
    roleTr: 'Teknik Lider',
    roleEn: 'Tech Lead',
    avatar: '/images/team/team3.jpg',
    socials: { linkedin: '#', github: '#' },
  },
  {
    id: '4',
    name: 'İlayda Güneş',
    roleTr: 'Sosyal Medya Uzmanı',
    roleEn: 'Social Media Specialist',
    avatar: '/images/team/team4.jpg',
    socials: { linkedin: '#', twitter: '#' },
  },
]
