'use client'

import { useState, useCallback } from "react";
import { getUploadUrl } from "@/lib/azure";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";

export default function ImageDropzone({
  name,
  initialUrl = "",
  aspectRatio = 1,
}: {
  name: string;
  initialUrl?: string;
  aspectRatio?: number;
}) {
  const [status, setStatus] = useState<"IDLE" | "UPLOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [finalUrl, setFinalUrl] = useState<string>(initialUrl);

  // Cropper states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("image.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read the file as a Data URL to display in the cropper
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setSelectedFileName(file.name);
    };
    reader.readAsDataURL(file);
    
    // Reset input value so the same file can be selected again if needed
    e.target.value = "";
  }

  async function handleCropAndUpload() {
    if (!selectedImage || !croppedAreaPixels) return;

    setStatus("UPLOADING");
    setSelectedImage(null); // Close the cropper modal

    try {
      // 1. Get the cropped file
      const croppedFile = await getCroppedImg(selectedImage, croppedAreaPixels, selectedFileName);

      // 2. Get the SAS token from our server
      const { uploadUrl, assetUrl } = await getUploadUrl(croppedFile.name);

      // 3. Upload directly to Azure from the browser
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": croppedFile.type,
        },
        body: croppedFile,
      });

      if (!response.ok) throw new Error("Azure upload failed");

      // 4. Save the clean URL to the hidden input for the form submission
      setFinalUrl(assetUrl);
      setStatus("SUCCESS");
    } catch (error) {
      console.error(error);
      setStatus("ERROR");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-xs text-gray-400">HERO_ASSET (Schematic / Photo)</label>
      
      <div className="relative flex items-center justify-center h-32 border border-gray-800 border-dashed brutalist-box bg-gray-900/30 hover:bg-gray-900 transition-colors">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          disabled={status === "UPLOADING"}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        
        <div className="font-mono text-sm text-gray-500 text-center pointer-events-none">
          {status === "IDLE" && (initialUrl || finalUrl ? "[CURRENT_ASSET_READY — SELECT_TO_REPLACE]" : "[CLICK_OR_DRAG_FILE]")}
          {status === "UPLOADING" && <span className="text-accent animate-pulse">UPLOADING_TO_AZURE...</span>}
          {status === "SUCCESS" && <span className="text-green-500">ASSET_LOCKED</span>}
          {status === "ERROR" && <span className="text-red-500">UPLOAD_FAILED</span>}
        </div>
      </div>

      {/* Cropper Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-2xl h-[60vh] bg-gray-900 border border-gray-700">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="w-full max-w-2xl mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-mono">Zoom</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-accent"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 font-mono hover:bg-gray-800 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleCropAndUpload}
                className="flex-1 px-4 py-3 bg-accent text-black font-mono font-bold hover:bg-blue-400 transition-colors"
              >
                CROP & UPLOAD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* This hidden input passes the Azure URL to your Server Action when the form is submitted */}
      <input type="hidden" name={name} value={finalUrl} />
    </div>
  );
}
