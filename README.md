# Şiir Paylaşım Uygulaması

## Proje Hakkında
Bu uygulama, kullanıcıların şiirlerini paylaşabilecekleri, diğer kullanıcıların şiirlerini görüntüleyebilecekleri ve yorum yapabilecekleri bir sosyal medya platformudur.

## Özellikler

### Genel Özellikler
- Şiir paylaşma alanı
- Ana sayfada tüm şiirlerin görüntülenmesi
- Profil sayfası ve kullanıcının paylaştığı şiirlerin listesi
- Kayıt olma ve giriş yapma fonksiyonları
- Şiirlere yorum yapabilme
- Trend olan şiirleri görüntüleme

### Teknik Özellikler
- Shadcn-UI, TypeScript ve Tailwind CSS ile geliştirilmiş modern arayüz
- Zustand ile durum yönetimi
- LocalStorage kullanılarak veri saklama
- Responsive tasarım ile mobil uyumlu arayüz
- Mobil cihazlar için özel alt navigasyon çubuğu (Anasayfa, Trend, Profil, Ayarlar)

## Kurulum

### Gereksinimler
- Node.js (v18 veya daha yeni)
- pnpm (v8 veya daha yeni)

### Adımlar

1. Repo'yu klonlayın
```bash
git clone https://github.com/onurislam/siir-platformu.git
cd siir-platformu
```

2. Bağımlılıkları yükleyin
```bash
pnpm install
```

3. Geliştirme sunucusunu başlatın
```bash
pnpm dev
```

4. Tarayıcınızda http://localhost:5173 adresini açın

## Dağıtım (Deployment)

Projeyi build etmek için:
```bash
pnpm build
```

Bu komut, dağıtılacak dosyaları `dist` klasörüne oluşturacaktır.

## Proje Yapısı

```
/src
  /components
    /layout
      navbar.tsx        # Navigasyon çubuğu bileşeni
    /poems
      poem-card.tsx     # Şiir kartı bileşeni
      poem-composer.tsx # Şiir oluşturma formu
  /hooks
    use-mobile.tsx      # Mobil görünüm için hook
  /lib
    store.ts           # Zustand durum yönetimi
  /pages
    Home.tsx           # Ana sayfa
    Login.tsx          # Giriş sayfası
    Profile.tsx        # Profil sayfası
    Register.tsx       # Kayıt sayfası
    NotFound.tsx       # 404 hata sayfası
  App.tsx              # Ana uygulama bileşeni
  index.html           # HTML giriş dosyası
```

## Lisans
Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.
