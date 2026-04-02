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
    name: 'Emirhan ÖZER',
    roleTr: '',
    roleEn: '',
    avatar: '/images/team/team1.jpg',
    socials: { linkedin: '#' },
  },
  {
    id: '2',
    name: 'İsrafil KARADOĞAN',
    roleTr: '',
    roleEn: '',
    avatar: '/images/team/team2.jpg',
    socials: { linkedin: '#' },
  },
]
