/**
 * BHADOTT Remote Studios — Conversor OG Image
 * Converte public/og-image.svg → public/og-image.png (1200x630)
 *
 * Como usar:
 *   npm install sharp --save-dev
 *   node scripts/convert-og.mjs
 */

import sharp from "sharp"
import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

const input  = join(root, "public", "og-image.svg")
const output = join(root, "public", "og-image.png")

console.log("🎨 Convertendo og-image.svg → og-image.png...")

const svgBuffer = readFileSync(input)

await sharp(svgBuffer)
  .resize(1200, 630, { fit: "fill" })
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(output)

console.log("✅ og-image.png gerado com sucesso em public/og-image.png")
console.log("   Tamanho: 1200 × 630 px — pronto para WhatsApp, Facebook, Twitter/X")
