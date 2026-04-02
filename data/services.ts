import ShareIcon from '@mui/icons-material/Share'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import CodeIcon from '@mui/icons-material/Code'
import VideocamIcon from '@mui/icons-material/Videocam'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import CampaignIcon from '@mui/icons-material/Campaign'
import { SvgIconComponent } from '@mui/icons-material'

export interface Service {
  id: string
  icon: SvgIconComponent
  image: string
  gradient: string
  glowColor: string
}

export const services: Service[] = [
  {
    id: 'socialMedia',
    icon: ShareIcon,
    image: '/images/services/social-media.jpg',
    gradient: 'linear-gradient(135deg, #F6BC0D 0%, #FDCB35 100%)',
    glowColor: 'rgba(246, 188, 13, 0.3)',
  },
  {
    id: 'aiVideo',
    icon: SmartDisplayIcon,
    image: '/images/services/ai-video.jpg',
    gradient: 'linear-gradient(135deg, #00D4AA 0%, #34E8C4 100%)',
    glowColor: 'rgba(0, 212, 170, 0.3)',
  },
  {
    id: 'software',
    icon: CodeIcon,
    image: '/images/services/software.png',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
    glowColor: 'rgba(255, 107, 53, 0.3)',
  },
  {
    id: 'videoProduction',
    icon: VideocamIcon,
    image: '/images/services/video-production.png',
    gradient: 'linear-gradient(135deg, #E91E8C 0%, #FF69B4 100%)',
    glowColor: 'rgba(233, 30, 140, 0.3)',
  },
  {
    id: 'seo',
    icon: TravelExploreIcon,
    image: '/images/services/seo.png',
    gradient: 'linear-gradient(135deg, #00B4D8 0%, #48CAE4 100%)',
    glowColor: 'rgba(0, 180, 216, 0.3)',
  },
  {
    id: 'ads',
    icon: CampaignIcon,
    image: '/images/services/ads.png',
    gradient: 'linear-gradient(135deg, #F4A261 0%, #E9C46A 100%)',
    glowColor: 'rgba(244, 162, 97, 0.3)',
  },
]
