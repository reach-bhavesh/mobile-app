const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createPNG(width, height) {
  // Construct uncompressed raw RGBA data
  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let pos = 0;

  for (let y = 0; y < height; y++) {
    rawBytes[pos++] = 0; // Filter type: None
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      // Gradient background (Deep blue to dark navy)
      let r = Math.round(2 + 25 * nx + 10 * ny);
      let g = Math.round(90 - 40 * ny);
      let b = Math.round(180 - 80 * ny);
      let a = 255;

      // Rounded corners
      const cornerRadius = width * 0.22;
      const dx = Math.min(x, width - 1 - x);
      const dy = Math.min(y, height - 1 - y);
      if (dx < cornerRadius && dy < cornerRadius) {
        const dist = Math.hypot(cornerRadius - dx, cornerRadius - dy);
        if (dist > cornerRadius) {
          a = 0;
        }
      }

      // Draw center Shield shape
      const cx = (x - width / 2) / (width * 0.4);
      const cy = (y - height / 2) / (height * 0.4);

      if (a > 0 && Math.abs(cx) < 0.8 && cy > -0.8 && cy < 0.9) {
        // Simple shield geometry
        if (cy <= 0.1 || Math.abs(cx) <= (1 - (cy - 0.1) / 0.8)) {
          // Inside shield
          r = Math.round(30 + 100 * nx);
          g = Math.round(140 + 60 * ny);
          b = Math.round(240);
        }
      }

      rawBytes[pos++] = r;
      rawBytes[pos++] = g;
      rawBytes[pos++] = b;
      rawBytes[pos++] = a;
    }
  }

  const compressed = zlib.deflateSync(rawBytes);

  // PNG Header
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

const dir = path.join(__dirname);
fs.writeFileSync(path.join(dir, 'icon-192.png'), createPNG(192, 192));
fs.writeFileSync(path.join(dir, 'icon-512.png'), createPNG(512, 512));
console.log('PNG icons created successfully!');
