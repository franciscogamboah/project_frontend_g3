// src/utils/imageResolver.js

// Importa todas las imágenes de la carpeta img
const images = import.meta.glob('../assets/img/*', { eager: true, import: 'default' });

/**
 * Obtiene la ruta de la imagen local según el sku_id.
 * Si no existe, retorna null.
 * @param {string} skuId 
 * @returns {string|null}
 */
export function getImageBySkuId(skuId) {
  // Puedes agregar más extensiones si usas varios tipos
  const candidates = [
    `../assets/img/${skuId}.png`,
    `../assets/img/${skuId}.jpg`,
    `../assets/img/${skuId}.jpeg`,
    `../assets/img/${skuId}.webp`,
  ];
  for (const path of candidates) {
    if (images[path]) {
      return images[path];
    }
  }
  return null;
}
