"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Upload, Check, ImageIcon } from "lucide-react";
import { getCroppedImg, processFullImage } from "@/lib/cropUtils";
import { siteConfig } from "@/lib/config";

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
  adminSecret: string;
}

export default function UploadModal({
  onClose,
  onUploadSuccess,
  adminSecret,
}: UploadModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("vtuber");

  const [aspect, setAspect] = useState<number | null>(4 / 5);
  const isOriginal = aspect === null;

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const handleUpload = async () => {
    if (!image || (!isOriginal && !croppedAreaPixels)) return;

    setIsUploading(true);
    try {
      const imgToProcess = image as string;
      const finalImage = isOriginal
        ? await processFullImage(imgToProcess)
        : await getCroppedImg(imgToProcess, croppedAreaPixels);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: finalImage,
          category,
          label,
          adminSecret,
        }),
      });

      if (response.ok) {
        onUploadSuccess();
        onClose();
      } else {
        alert("Upload failed. Please check your admin secret or connections.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
      <div
        className="absolute inset-0 bg-[var(--color-studio-dark)]/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[var(--color-studio-slate)] border border-hairline border-[var(--color-textdim)]/20 rounded-studio overflow-hidden flex flex-col max-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-hairline border-[var(--color-textdim)]/10">
          <div>
            <h3 className="text-xl font-black tracking-tighter uppercase">
              New Gallery Asset
            </h3>
            <p className="text-[9px] font-mono text-[var(--color-textdim)] uppercase tracking-widest mt-1">
              Upload & Resolution Format
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--color-textdim)] hover:text-[var(--color-text)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-8">
          {/* Left: Cropper */}
          <div className="flex-1 flex flex-col">
            <div className="relative w-full aspect-square bg-[var(--color-nightdark)] rounded-sm overflow-hidden border border-hairline border-[var(--color-textdim)]/20 mb-4 min-h-[300px]">
              {image ? (
                isOriginal ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt="Original preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect || undefined}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    classes={{
                      containerClassName: "bg-transparent",
                      mediaClassName: "max-w-none",
                    }}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <ImageIcon className="w-12 h-12 text-[var(--color-textdim)] mb-4" />
                  <p className="text-[10px] text-[var(--color-textdim)] uppercase tracking-widest font-mono mb-6">
                    Select an image to start uploads
                  </p>
                  <label className="px-6 py-3 bg-[var(--color-nightmid)] border border-hairline border-[var(--color-textdim)]/20 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-[var(--color-studio-navy)] transition-all">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                  </label>
                </div>
              )}
            </div>

            {image && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[var(--color-textdim)]">
                  <span>Aspect Ratio</span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setAspect(4 / 5)}
                      className={`hover:text-[var(--color-neon)] transition-colors ${aspect === 4 / 5 ? "text-[var(--color-neon)]" : ""}`}
                    >
                      Portrait (4:5)
                    </button>
                    <button
                      onClick={() => setAspect(1)}
                      className={`hover:text-[var(--color-neon)] transition-colors ${aspect === 1 ? "text-[var(--color-neon)]" : ""}`}
                    >
                      Square (1:1)
                    </button>
                    <button
                      onClick={() => setAspect(null)}
                      className={`hover:text-[var(--color-neon)] transition-colors ${aspect === null ? "text-[var(--color-neon)]" : ""}`}
                    >
                      Original (No Crop)
                    </button>
                    <button
                      onClick={() => setAspect(16 / 9)}
                      className={`hover:text-[var(--color-neon)] transition-colors ${aspect === 16 / 9 ? "text-[var(--color-neon)]" : ""}`}
                    >
                      Cinematic (16:9)
                    </button>
                  </div>
                </div>

                {!isOriginal && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-textdim)]">
                        Zoom
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-neon)]">
                        {Math.round(zoom * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-[var(--color-neon)]"
                    />
                  </>
                )}
                <button
                  onClick={() => setImage(null)}
                  className="text-[9px] uppercase tracking-widest font-mono text-[var(--color-neonpink)] hover:underline"
                >
                  Change Image
                </button>
              </div>
            )}
          </div>

          {/* Right: Metadata */}
          <div className="w-full lg:w-80 space-y-8">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-[var(--color-textdim)] mb-3">
                Artwork Title
              </label>
              <input
                type="text"
                placeholder="e.g. Cyberpunk Portrait"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full bg-[var(--color-nightdark)] border border-[var(--color-textdim)]/20 p-4 text-sm outline-none focus:border-[var(--color-neon)] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-[var(--color-textdim)] mb-3">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[var(--color-nightdark)] border border-[var(--color-textdim)]/20 p-4 text-sm outline-none focus:border-[var(--color-neon)] transition-all appearance-none"
              >
                {siteConfig.galleryCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                disabled={!image || isUploading}
                onClick={handleUpload}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--color-neon)] text-[var(--color-studio-dark)] font-black uppercase tracking-[0.2em] text-xs rounded-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isUploading ? "Uploading..." : "Confirm & Upload"}
              </button>
              <p className="text-[9px] text-[var(--color-textdim)] uppercase text-center mt-4 tracking-widest leading-relaxed">
                Images will be processed and <br /> stored on Cloudinary CDN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
