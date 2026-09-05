// filepath: src/components/admin/ImageDropzone.tsx
'use client'

import { useState } from "react";
import { getUploadUrl } from "@/lib/azure";

export default function ImageDropzone({
  name,
  initialUrl = "",
}: {
  name: string;
  initialUrl?: string;
}) {
  const [status, setStatus] = useState<"IDLE" | "UPLOADING" | "SUCCESS" | "ERROR">("IDLE");
  const [finalUrl, setFinalUrl] = useState<string>(initialUrl);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("UPLOADING");

    try {
      // 1. Get the SAS token from our server
      const { uploadUrl, assetUrl } = await getUploadUrl(file.name);

      // 2. Upload directly to Azure from the browser
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) throw new Error("Azure upload failed");

      // 3. Save the clean URL to the hidden input for the form submission
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
          disabled={status === "UPLOADING" || status === "SUCCESS"}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        
        <div className="font-mono text-sm text-gray-500 text-center pointer-events-none">
          {status === "IDLE" && (initialUrl ? "[CURRENT_ASSET_READY — SELECT_TO_REPLACE]" : "[CLICK_OR_DRAG_FILE]")}
          {status === "UPLOADING" && <span className="text-accent animate-pulse">UPLOADING_TO_AZURE...</span>}
          {status === "SUCCESS" && <span className="text-green-500">ASSET_LOCKED</span>}
          {status === "ERROR" && <span className="text-red-500">UPLOAD_FAILED</span>}
        </div>
      </div>

      {/* This hidden input passes the Azure URL to your Server Action when the form is submitted */}
      <input type="hidden" name={name} value={finalUrl} />
    </div>
  );
}
