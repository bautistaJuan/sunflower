const fs = require("fs"); // Para escribir un archivo en el sistema de archivos
const path = require("path"); // Para localizar archivos en el sistema de archivos

// Ruta de la carpeta donde están las imágenes
const assetsDir = path.join(__dirname, "src/assets");

// Leer archivos del directorio
const files = fs
  .readdirSync(assetsDir)
  .filter(file => /\.(png|jpe?g|svg)$/.test(file));

// Crear productos automáticamente
const products = files.map((file, index) => ({
  id: index + 1,
  name: file
    .replace(/\.(png|jpe?g|svg)$/, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .toUpperCase(),
  price: Math.floor(Math.random() * 10000 + 1000), // Precio aleatorio
  image: `./assets/${file}`,
  category: "aros",
}));

// Generar el archivo de salida
const output = `export const products = ${JSON.stringify(products, null, 2)};`;

fs.writeFileSync(path.join(__dirname, "src/images.js"), output, "utf8");
console.log("Archivo products.js generado correctamente.");
