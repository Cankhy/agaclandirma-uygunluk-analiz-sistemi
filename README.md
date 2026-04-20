# Ağaçlandırma Uygunluk Analiz Sistemi

Çok kriterli arazi uygunluğu, tür önerisi, saha karşılaştırması ve uygulama fizibilitesi üreten GIS tabanlı karar destek prototipi.

Canlı demo: [cankhy.github.io/agaclandirma-uygunluk-analiz-sistemi](https://cankhy.github.io/agaclandirma-uygunluk-analiz-sistemi/)

Bu proje, ağaçlandırma planlamasını yalnızca haritada göstermeyen; arazi kriterlerinden uygunluk skoru, tür önerisi, uygulama zorluğu, saha takvimi ve rapor çıktısı üreten profesyonel bir portföy ürünüdür.

## Öne Çıkan Modüller

- Harita merkezli aday saha analizi
- Uygunluk, erozyon, yağış ve erişim katmanları
- Normal yıl, kurak yıl ve yüksek yağış yılı senaryoları
- Eğim, bakı, yağış, toprak derinliği, erozyon ve erişim kriterleri
- Ayarlanabilir model ağırlıkları
- Ağaç türü öneri motoru
- Maliyet ve uygulama zorluğu tahmini
- Hazırlık, dikim, bakım ve izleme takvimi
- Saha öncelik matrisi ve karşılaştırmalı analiz
- Rapor metni indirme ve yazdırılabilir görünüm
- SEO, manifest, sitemap, robots ve GitHub Pages yayını

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

- `data/afforestation-sites.geojson`: Aday ağaçlandırma sahaları ve saha kriterleri

Veri setinde farklı iklim, topoğrafya, erozyon ve erişim karakterlerine sahip örnek sahalar bulunur. Sahalar prototip amacıyla modellenmiştir.

## Analiz Mantığı

Model dört ana kriter grubunu birlikte değerlendirir:

- Topografya: eğim ve bakı
- İklim: yıllık yağış ve senaryo etkisi
- Toprak: toprak derinliği ve erozyon riski
- Erişim: yol uzaklığı ve uygulama lojistiği

Bu kriterler kullanıcı tarafından değiştirilebilen ağırlıklarla tek uygunluk skoruna dönüştürülür. Tür öneri motoru, hedef tür grubu ve saha koşullarına göre önerileri sıralar.

## GitHub Pages

Repo GitHub'a gönderildikten sonra `Settings > Pages` ekranında kaynak olarak `GitHub Actions` seçilir. `main` dalına yapılan push sonrası site otomatik yayın alır.

Canlı link:

```text
https://cankhy.github.io/agaclandirma-uygunluk-analiz-sistemi/
```

## Portföy Değeri

Bu repo şu mesajı verir:

> Konumsal veriyi sadece haritada göstermiyor; arazi kriterlerinden karar destek skoru, tür önerisi, uygulama takvimi ve rapor çıktısı üretebiliyor.

GIS, kamu teknolojileri, orman mühendisliği yazılımları, çevresel karar destek sistemleri ve arazi planlama projeleri için güçlü bir portföy parçası olacak şekilde hazırlanmıştır.

## Not

Bu çalışma resmî kurum uygulaması değildir. Demo sahaları ve skorlar portföy prototipi amacıyla modellenmiştir.
