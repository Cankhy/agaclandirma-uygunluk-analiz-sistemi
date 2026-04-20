# Ağaçlandırma Uygunluk Analiz Sistemi

Çok kriterli arazi uygunluğu, tür önerisi ve saha önceliklendirme üreten GIS tabanlı karar destek prototipi.

Bu proje, ilk projedeki yangın izleme yapısına benzemeyecek şekilde ayrı bir ürün diliyle tasarlandı. Büyük tanıtım sayfası yerine sol menülü, harita merkezli ve analiz konsolu hissi veren profesyonel bir çalışma alanı kullanır.

## Öne Çıkan Modüller

- Harita merkezli aday saha analizi
- Eğim, bakı, yağış, toprak derinliği, erozyon ve erişim kriterleri
- Ayarlanabilir model ağırlıkları
- Ağaç türü öneri motoru
- Saha öncelik matrisi
- Yönetici özeti ve uygulama raporu
- GitHub Pages otomatik yayın workflow'u

## Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript
- Leaflet
- GeoJSON
- GitHub Pages

## Çalıştırma

Projeyi doğrudan tarayıcıda açabilirsin:

```bash
index.html
```

Kalite kontrol:

```bash
npm run lint
```

## Veri Katmanı

- `data/afforestation-sites.geojson`: Aday ağaçlandırma sahaları

## GitHub Pages

Repo GitHub'a gönderildikten sonra `Settings > Pages` ekranında kaynak olarak `GitHub Actions` seçilir. `main` dalına yapılan push sonrası site otomatik yayın alır.

Canlı link formatı:

```text
https://kullanici-adin.github.io/agaclandirma-uygunluk-analiz-sistemi/
```

## Portföy Değeri

Bu repo şu mesajı verir:

> Konumsal veriyi sadece haritada göstermiyor; arazi kriterlerinden karar destek skoru, tür önerisi ve uygulama önceliği üretebiliyor.

GIS, kamu teknolojileri, orman mühendisliği yazılımları, çevresel karar destek sistemleri ve arazi planlama projeleri için güçlü bir portföy parçası olacak şekilde hazırlanmıştır.

## Not

Bu çalışma resmî kurum uygulaması değildir. Demo sahaları ve skorlar portföy prototipi amacıyla modellenmiştir.
