# Tobii 4C en macOS — demo WebUSB

Demo en navegador para usar un **Tobii 4C** (`2104:0127`) en Mac sin drivers oficiales, vía **WebUSB** y el proyecto experimental [tobiifree](https://github.com/aetherall/tobiifree).

Incluye:

- **Demo principal** — conexión USB, visualización de mirada, calibración onboard
- **Explota globos** — minijuego para practicar fijación con globos de distinto tamaño
- **Camino de setas** — recorre un sendero en el bosque y recoge setas con la mirada

## Requisitos

- macOS con **Google Chrome** (o Edge)
- Tobii 4C conectado por USB
- Solo **una pestaña** puede usar el dispositivo a la vez

> Tobii no ofrece drivers oficiales para este modelo en Mac. Esto es experimental.

## Uso local

```bash
cd tobii-4c-demo
ruby -run -e httpd . -p 8765 -b 127.0.0.1
```

Abre en Chrome:

- Demo: http://127.0.0.1:8765/
- Globos: http://127.0.0.1:8765/balloons.html
- Setas: http://127.0.0.1:8765/setas.html

## GitHub Pages

Tras el despliegue, la URL será:

`https://<usuario>.github.io/tobii-4c-demo/`

1. Conecta el Tobii 4C
2. Abre la URL en Chrome
3. **USB** → **Connect** → elige **EyeChip**
4. Calibra con **Onboard cal** (9 puntos recomendado)
5. Cierra esa pestaña antes de abrir el juego

## Calibración

En la demo principal, al final del panel lateral:

1. **Fullscreen** (recomendado)
2. **Grant window mgmt** — Chrome necesita saber dónde está la ventana en la pantalla
3. **Big plane** — el área por defecto (400×300 mm) suele ser pequeña; esto pone 1000×500 mm
4. Elige **9 pt**
5. **Onboard cal** y mira cada punto naranja (luego haz clic para capturar)

Si la mirada **no llega a las esquinas**, casi siempre es el **display area** mal ajustado, no el juego. Comprueba que el punto verde de mirada sigue el cursor del ratón en toda la pantalla antes de calibrar.

## Créditos

- [aetherall/tobiifree](https://github.com/aetherall/tobiifree) — protocolo y SDK WebAssembly
- [george-wyy/tobiifree](https://github.com/george-wyy/tobiifree) (`feat/tobii-4c-support`) — soporte Tobii 4C

Licencia: **GPL-3.0** — ver [LICENSE](LICENSE).
