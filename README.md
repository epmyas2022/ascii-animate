
# ASCII Art Animate

Este es un proyecto en node.js que permite mostrar una animación en ASCII Art en la consola a través de una
petición CURL realizada desde la terminal.

## 📝 Requisitos

- Node.js 20.0.0 o superior

## 🔨 Instalación

Clonar el respotorio

```bash
git clone https://github.com/epmyas2022/ascii-animate.git
```

Acceder a la carpeta del proyecto

```bash
cd ascii-animate
```

Instalar las dependencias

```bash
npm install
```

De forma opcional, se puede configurar el puerto y host en el que se ejecutará el servidor modificando el archivo `.env`

```env
PORT=3000
HOST=localhost
```

## 🚀 Levantar servidor

Levantar el servidor en modo desarrollo

```bash
npm run dev
```

Levantar el servidor en modo producción

```bash
npm start
```

## 🐋 Instalación con Docker

Construir la imagen en modo desarrollo

```bash
docker-compose up -d development
```

Construir la imagen en modo producción

```bash
docker-compose up -d production
```

## 🚀 Uso

Realizar una petición CURL al servidor

```bash
curl http://localhost:3000
```

Existen distintas animaciones que se pueden mostrar, para ello se puede pasar un parámetro de ruta en la petición CURL

```bash
curl http://localhost:3000/parrot
```

Esta es la lista de animaciones disponibles:

| Nombre | Descripción |
| ------ | ----------- |
| parrot | Muestra un loro |
| moster | Muestra un monstruo |
| car | Muestra un auto |
| pyramid | Muestra una pirámide |
| banner | Muestra un banner con letras |
