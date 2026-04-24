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
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c37e63d2-1813-440c-40db-e70f0307b200/public',
    gradient: 'linear-gradient(135deg, #F6BC0D 0%, #FDCB35 100%)',
    glowColor: 'rgba(246, 188, 13, 0.3)',
  },
  {
    id: 'aiVideo',
    icon: SmartDisplayIcon,
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/9244c2ef-5ef2-4107-fcc5-22485284fb00/public',
    gradient: 'linear-gradient(135deg, #00D4AA 0%, #34E8C4 100%)',
    glowColor: 'rgba(0, 212, 170, 0.3)',
  },
  {
    id: 'software',
    icon: CodeIcon,
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/2a13b918-ac25-4516-2bb7-8db97f5df700/public',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8F6B 100%)',
    glowColor: 'rgba(255, 107, 53, 0.3)',
  },
  {
    id: 'videoProduction',
    icon: VideocamIcon,
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/672ebd3f-e85e-4d48-bdf9-213124e6cc00/public',
    gradient: 'linear-gradient(135deg, #E91E8C 0%, #FF69B4 100%)',
    glowColor: 'rgba(233, 30, 140, 0.3)',
  },
  {
    id: 'seo',
    icon: TravelExploreIcon,
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/222d0c1a-6f76-4b37-72f8-1f791798d900/public',
    gradient: 'linear-gradient(135deg, #00B4D8 0%, #48CAE4 100%)',
    glowColor: 'rgba(0, 180, 216, 0.3)',
  },
  {
    id: 'ads',
    icon: CampaignIcon,
    image: 'https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/329675ef-2609-4bb2-1e5a-1a5b4fab9000/public',
    gradient: 'linear-gradient(135deg, #F4A261 0%, #E9C46A 100%)',
    glowColor: 'rgba(244, 162, 97, 0.3)',
  },
]
