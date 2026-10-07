import fs from 'fs';
import zlib from 'zlib';

function processPNG(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  
  // Verify PNG signature
  if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
    console.error('Not a valid PNG');
    return;
  }

  let offset = 8;
  let width, height, bitDepth, colorType;
  let idatChunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      console.log(`PNG IHDR: ${width}x${height}, depth=${bitDepth}, colorType=${colorType}`);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);
  console.log(`Decompressed size: ${decompressed.length} bytes`);

  const bytesPerPixel = colorType === 6 ? 4 : colorType === 2 ? 3 : 4;
  const stride = 1 + width * bytesPerPixel;
  
  const uncompressedNew = Buffer.alloc(height * (1 + width * 4));
  const rawData = Buffer.alloc(height * width * bytesPerPixel);
  
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[y * stride];
    const srcRow = decompressed.subarray(y * stride + 1, (y + 1) * stride);
    const prevRow = y > 0 ? rawData.subarray((y - 1) * width * bytesPerPixel, y * width * bytesPerPixel) : null;
    const destRow = rawData.subarray(y * width * bytesPerPixel, (y + 1) * width * bytesPerPixel);

    for (let x = 0; x < width * bytesPerPixel; x++) {
      const a = x >= bytesPerPixel ? destRow[x - bytesPerPixel] : 0;
      const b = prevRow ? prevRow[x] : 0;
      const c = prevRow && x >= bytesPerPixel ? prevRow[x - bytesPerPixel] : 0;
      let val = srcRow[x];

      if (filterType === 0) {
      } else if (filterType === 1) {
        val = (val + a) & 0xFF;
      } else if (filterType === 2) {
        val = (val + b) & 0xFF;
      } else if (filterType === 3) {
        val = (val + Math.floor((a + b) / 2)) & 0xFF;
      } else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        val = (val + pr) & 0xFF;
      }
      destRow[x] = val;
    }
  }

  // Find bounding box of content (non-white pixels)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * bytesPerPixel;
      const r = rawData[srcIdx];
      const g = rawData[srcIdx + 1];
      const b = rawData[srcIdx + 2];
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Content bounding box: x=[${minX}, ${maxX}], y=[${minY}, ${maxY}] (original size: ${width}x${height})`);

  // Crop to content with small padding
  const pad = 12;
  const cropMinX = Math.max(0, minX - pad);
  const cropMaxX = Math.min(width - 1, maxX + pad);
  const cropMinY = Math.max(0, minY - pad);
  const cropMaxY = Math.min(height - 1, maxY + pad);

  const cropW = cropMaxX - cropMinX + 1;
  const cropH = cropMaxY - cropMinY + 1;
  console.log(`Cropped size: ${cropW}x${cropH} (fills 95% bounding box)`);

  const croppedBuffer = Buffer.alloc(cropH * (1 + cropW * 4));

  for (let y = 0; y < cropH; y++) {
    const origY = cropMinY + y;
    const newRowOffset = y * (1 + cropW * 4);
    croppedBuffer[newRowOffset] = 0;

    for (let x = 0; x < cropW; x++) {
      const origX = cropMinX + x;
      const srcIdx = (origY * width + origX) * bytesPerPixel;
      const destIdx = newRowOffset + 1 + x * 4;

      const r = rawData[srcIdx];
      const g = rawData[srcIdx + 1];
      const b = rawData[srcIdx + 2];
      const origA = bytesPerPixel === 4 ? rawData[srcIdx + 3] : 255;

      const minChan = Math.min(r, g, b);
      const maxChan = Math.max(r, g, b);
      const sat = maxChan - minChan;

      let alpha = origA;
      if (minChan > 220) {
        const diff = (255 - r) * 0.33 + (255 - g) * 0.33 + (255 - b) * 0.34;
        if (diff < 12 && sat < 8) {
          alpha = 0;
        } else if (diff < 35 && sat < 15) {
          alpha = Math.min(255, Math.floor((diff / 35) * 255 * (sat > 6 ? 1.4 : 0.8)));
        }
      }

      croppedBuffer[destIdx] = r;
      croppedBuffer[destIdx + 1] = g;
      croppedBuffer[destIdx + 2] = b;
      croppedBuffer[destIdx + 3] = alpha;
    }
  }

  const newCompressed = zlib.deflateSync(croppedBuffer, { level: 9 });

  function makeChunk(type, data) {
    const len = data.length;
    const chunk = Buffer.alloc(12 + len);
    chunk.writeUInt32BE(len, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
    chunk.writeUInt32BE(crc, 8 + len);
    return chunk;
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropW, 0);
  ihdrData.writeUInt32BE(cropH, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', newCompressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const finalPng = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, finalPng);
  console.log(`Saved transparent cropped PNG to ${outputPath} (${finalPng.length} bytes)`);
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

processPNG('c:/salon-website/public/glam-girl-brand-logo.png', 'c:/salon-website/public/glam-girl-transparent.png');
processPNG('c:/salon-website/public/glam-girl-brand-logo.png', 'c:/salon-website/src/assets/glam-girl-transparent.png');
