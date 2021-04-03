# KartacaCekirdektenYetisenler

## Nasıl çalıştırılır
Bu proje docker-compose ile rahatlıkla çalıştırılabilir.
```sh
docker-compose build && docker-compose up -d
```
ile başlatabilirsiniz.

## Endpointler


### GET /
Cevap:
```json
{ status: true }
```

### POST /
Cevap:
```json
{ status: true } 
``` 

### PUT /
Cevap:
```json
{ status: true }
```

### DELETE /
Cevap:
```json
{ status: true }
```

### GET /lastlogs
> Son bir saat içindeki isteklerin methodu, cevaplama zamanı ve timestampini döndürür.

Cevap:
```json
[
    {
        "method": "GET|POST|PUT|DELETE",
        "reponse_time": 0.126,
        "timestamp": "2021-04-03T20:06:47.634Z"
    }
]
```


## Eksiklikler
- Dashboard arayüzü
- Log dosyası

## Anahtar kodu
gAAAAABgUhYHNDJBldCVoqD3yUwQLHrIu_BUR7XNOUSOXLNj0q0tn3ZmN0r9Ej042ZP_bc-KqEboPZwCBaqDqmXhQcGcVxnSKeF8EtqMWfc1106qqIIIbr93ZRxVQtkKXWgDPX2uTJa6WJo-_TvW3Sv1Yk24Us-AhLYF5uqAOOfTDsYeofvauKHa-ky3gAXe2iPqyGU5hs1TH7Bbg68eScXGJ7YswKjonw==