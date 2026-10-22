
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function testUpload() {
  try {
    // Backend folder mein test.png naam ki image rakho
    const imagePath = path.join(__dirname, "test.png");

    if (!fs.existsSync(imagePath)) {
      console.error("ERROR: backend/test.png file nahi mili.");
      return;
    }

    const imageBuffer = fs.readFileSync(imagePath);

    console.log("Image size:", imageBuffer.length, "bytes");
    console.log("ImageKit direct upload test shuru...");

    const result = await imagekit.upload({
      file: imageBuffer.toString("base64"),
      fileName: `imagekit-test-${Date.now()}.png`,
    });

    console.log("UPLOAD SUCCESS!");
    console.log("File ID:", result.fileId);
    console.log("Image URL:", result.url);
  } catch (error) {
    console.error("UPLOAD FAILED");
    console.dir(error, { depth: 10 });
    console.error("Message:", error?.message);
    console.error("Status:", error?.statusCode);
    console.error("Response:", error?.response?.data);
  }
}

testUpload();
