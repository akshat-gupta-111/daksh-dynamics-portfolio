// filepath: src/lib/azure.ts
'use server'

import { StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";

export async function getUploadUrl(fileName: string) {
  const accountName = process.env.AZURE_ACCOUNT_NAME!;
  const accountKey = process.env.AZURE_ACCOUNT_KEY!;
  const containerName = process.env.AZURE_CONTAINER_NAME!;

  // Clean the filename to prevent URL encoding issues
  const cleanFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  
  // Generate a token valid for exactly 5 minutes with Create and Write permissions
  const sasOptions = {
    containerName,
    blobName: cleanFileName,
    permissions: BlobSASPermissions.parse("cw"), 
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 5 * 60 * 1000), 
  };

  const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
  
  // Return the full SAS URL and the clean base URL (for the database)
  const baseUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${cleanFileName}`;
  
  return {
    uploadUrl: `${baseUrl}?${sasToken}`,
    assetUrl: baseUrl
  };
}