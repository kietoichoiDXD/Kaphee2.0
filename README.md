# Kaphee 2.0

Frontend cho du an Kaphee theo phong cach vintage coffee, su dung React + Vite + Tailwind + Motion + Three.js.

## Chay local

Yeu cau:
- Node.js 18+

Lenh:
```bash
npm install
npm run dev
```


## Cau truc thu muc chinh

```text
src/
|- app/
|- assets/
|- components/
|  |- sections/
|  \- ui/
|- core/
|- hooks/
|- lib/
|- pages/
\- styles/

public/
\- models/
```

## 3D coffee cup model

Viewer uu tien load model GLB tai:

- /models/coffee_cup_blender.glb

Neu chua co file GLB, he thong se tu dong fallback sang cup procedural de khong vo giao dien.
