export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
    image.src = url;
  });

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  // Max dimension for the output image (e.g., 1600px width or height)
  const MAX_DIMENSION = 1600;
  let targetWidth = pixelCrop.width;
  let targetHeight = pixelCrop.height;

  // Scale down if the cropped area is larger than our max dimension
  if (targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION) {
    const ratio = Math.min(
      MAX_DIMENSION / targetWidth,
      MAX_DIMENSION / targetHeight,
    );
    targetWidth = targetWidth * ratio;
    targetHeight = targetHeight * ratio;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  return new Promise((resolve) => {
    // "image/webp" is widely supported and much smaller than PNG/JPEG
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      },
      "image/webp",
      0.65, // Quality
    );
  });
}

export async function processFullImage(imageSrc: string): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  const MAX_DIMENSION = 1600;
  let targetWidth = image.naturalWidth;
  let targetHeight = image.naturalHeight;

  if (targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION) {
    const ratio = Math.min(
      MAX_DIMENSION / targetWidth,
      MAX_DIMENSION / targetHeight,
    );
    targetWidth = targetWidth * ratio;
    targetHeight = targetHeight * ratio;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
      },
      "image/webp",
      0.55,
    );
  });
}
