import { Box, Container, Typography } from '@mui/material'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  params: Promise<{ lang: Locale }>
}

export default async function PolitikalarPage({ params }: Props) {
  await params

  return (
    <Box sx={{ pt: 14, pb: 8, minHeight: '100vh', bg: '#FDFDFD' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 800, mb: 1, color: '#1A1A1A' }}>
          Gizlilik Politikası
        </Typography>
        <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', mb: 4 }}>
          Son güncellenme: 11/04/2026
        </Typography>

        <Box sx={{ lineHeight: 2, color: 'rgba(0,0,0,0.7)', fontSize: '1rem', '& p': { mb: 2 }, '& h2': { fontSize: '1.3rem', fontWeight: 700, mt: 4, mb: 2, color: '#1A1A1A' } }}>
          <Typography component="p">
            Güvenliğiniz bizim için önemli. Bu sebeple bizimle paylaşacağınız kişisel verileriniz hassasiyetle korunmaktadır.
          </Typography>

          <Typography component="p">
            Biz, Pointcraft, veri sorumlusu olarak, bu gizlilik ve kişisel verilerin korunması politikası ile; hangi kişisel verilerinizin hangi amaçla işleneceği, işlenen verilerin kimlerle ve neden paylaşılabileceği, veri işleme yöntemimiz ve hukuki sebeplerimiz ile; işlenen verilerinize ilişkin haklarınızın neler olduğu hususunda sizleri aydınlatmayı amaçlıyoruz.
          </Typography>

          <Typography component="h2">
            Toplanan Kişisel Verileriniz, Toplanma Yöntemi ve Hukuki Sebebi
          </Typography>
          <Typography component="p">
            IP adresiniz ve kullanıcı aracısı bilgileriniz, sadece analiz yapmak amacıyla ve çerezler (cookies) vb. teknolojiler vasıtasıyla, otomatik veya otomatik olmayan yöntemlerle ve bazen de analitik sağlayıcılar, reklam ağları, arama bilgi sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek, depolanarak ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde ve süresince, meşru menfaat işleme şartına dayanılarak işlenecektir.
          </Typography>

          <Typography component="h2">
            Kişisel Verilerinizin İşlenme Amacı
          </Typography>
          <Typography component="p">
            Bizimle paylaştığınız kişisel verileriniz sadece analiz yapmak suretiyle; sunduğumuz hizmetlerin gerekliliklerini en iyi şekilde yerine getirebilmek, bu hizmetlere sizin tarafınızdan ulaşılabilmesini ve maksimum düzeyde faydalanılabilmesini sağlamak, hizmetlerimizi ihtiyaçlarınız doğrultusunda geliştirebilmek ve sizleri daha geniş kapsamlı hizmet sağlayıcıları ile yasal çerçeveler içerisinde buluşturabilmek ve kanundan doğan zorunluluklerin yerine getirilebilmesi amacıyla, sözleşme ve hizmet süresince, amacına uygun ve ölçülü bir şekilde işlenecek ve güncellenecektir.
          </Typography>

          <Typography component="h2">
            Toplanan Kişisel Verilerin Kimlere ve Hangi Amaçlarla Aktarılabileceği
          </Typography>
          <Typography component="p">
            Bizimle paylaştığınız kişisel verileriniz; faaliyetlerimizi yürütmek üzere hizmet aldığımız ve/veya verdiğimiz, sözleşmesel ilişki içerisinde bulunduğumuz, iş birliği yaptığımız, yurt içi ve yurt dışındaki 3. şahıslar ile kurum ve kuruluşlara ve talep halinde adli ve idari makamlara, gerekli teknik ve idari önlemler alınması koşulu ile aktarılabilecektir.
          </Typography>

          <Typography component="h2">
            Kişisel Verileri İşlenen Kişi Olarak Haklarınız
          </Typography>
          <Typography component="p">
            KVKK madde 11 uyarınca herkes, veri sorumlusuna başvurarak aşağıdaki haklarını kullanabilir:
          </Typography>

          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel veri işlenip işlenmediğini öğrenme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel verilerin silinmesini veya yok edilmesini isteme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>İşlenen verilerin otomatik sistemlerle analiz edilmesi suretiyle kişinin aleyhine bir sonucun ortaya çıkmasına itiraz etme</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Kişisel verilerin kanuna aykırı işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</Typography>
          </Box>

          <Typography component="p">
            Haklarınızı kullanmak için bizimle pointcrafttr@gmail.com üzerinden iletişime geçebilirsiniz.
          </Typography>

          <Typography component="h2">
            İletişim
          </Typography>
          <Typography component="p">
            Siteyi kullanmaya devam ettiğiniz takdirde, gizlilik ve kişisel verilerin işlenmesi politikasını kabul etmiş sayılacaksınız. Daha ayrıntılı bilgi için bizimle pointcrafttr@gmail.com üzerinden iletişime geçebilirsiniz.
          </Typography>

          <Typography component="h2">
            Kullanım Koşulları
          </Typography>
          <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', mb: 2 }}>
            Son güncellenme: 11/04/2026
          </Typography>
          <Typography component="p">
            Lütfen https://pointcraft.com.tr web sitemizi ziyaret etmeden önce kullanım koşullarını dikkatlice okuyunuz.
          </Typography>
          <Typography component="p">
            Siteye erişiminiz tamamen bu sözleşmeyi kabulünüze ve bu sözleşme ile belirlenen şartlara uymanıza bağlıdır. https://pointcraft.com.tr web sitesi Pointcraft tarafından yönetilmekte olup, bundan sonra SİTE olarak anılacaktır.
          </Typography>

          <Typography component="h2">
            Çerez Politikası
          </Typography>
          <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', mb: 2 }}>
            Son güncellenme: 11/04/2026
          </Typography>
          <Typography component="p">
            Biz, Pointcraft olarak güvenliğinize önem veriyor ve bu Çerez Politikası ile sizleri, web sitemizde hangi çerezleri kullandığımız ve çerez ayarlarınızı nasıl değiştirebileceğiniz konusunda bilgilendirmeyi hedefliyoruz.
          </Typography>
          <Typography component="p">
            Sorularınız için bizimle pointcrafttr@gmail.com üzerinden iletişime geçebilirsiniz.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
