import FormData from "form-data";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const botToken: string = process.env.TELEGRAM_BOT_TOKEN || ""; 
const channelId: string = process.env.TELEGRAM_CHANNEL_ID || "";
const MAX_CHUNK_SIZE: number = 150 * 1024 * 1024;

if (!botToken || !channelId) {
  throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID in environment variables.");
}

// Interfaces for structured data
interface TelegramResponse {
  ok: boolean;
  result?: {
    document?: {
      file_id: string;
    };
    file_path?: string;
  };
}

interface FileChunk {
  success: boolean;
  fileId?: string;
}

// Fetch metadata and file from Telegram
export async function getFileData(data: { id: string; filename: string; contentType: string }): Promise<any> {
  const fileMetaUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${data.id}`;
  const response = await axios.get(fileMetaUrl);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  const res: TelegramResponse = response.data;
  if (!res.ok || !res.result?.file_path) {
    throw new Error("Failed to fetch file metadata.");
  }

  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${res.result.file_path}`;
  return axios.get(fileUrl, { responseType: 'stream' });
}

// Fetch a single chunk stream from Telegram
export async function fetchTelegramChunkStream(filePath: string): Promise<any> {
  const fileMetaUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${filePath}`;
  const response = await axios.get(fileMetaUrl);

  const res: TelegramResponse = response.data;
  if (response.status !== 200 || !res.ok || !res.result?.file_path) {
    throw new Error("Failed to fetch file metadata.");
  }

  const downloadUrl = `https://api.telegram.org/file/bot${botToken}/${res.result.file_path}`;
  const fileResponse = await axios.get(downloadUrl, { responseType: 'stream' });

  if (fileResponse.status !== 200) {
    throw new Error(`Failed to download chunk from Telegram: ${fileResponse.statusText}`);
  }

  return fileResponse;
}

export function splitFileIntoChunks(fileBuffer: Buffer): Buffer[] {
  const chunks: Buffer[] = [];
  const fileSize = fileBuffer.byteLength;
  for (let i = 0; i < fileSize; i += MAX_CHUNK_SIZE) {
    chunks.push(fileBuffer.slice(i, i + MAX_CHUNK_SIZE));
  }
  return chunks;
}

export async function sendFileToTelegram(chunk: Buffer, chunkNo: number, filename: string): Promise<{ success: boolean; fileId?: string }> {
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendDocument`;
  const formData = new FormData();
  formData.append("chat_id", channelId);
  formData.append("document", chunk, `chunk_${chunkNo}.bin`);
  formData.append("caption", `Name: ${filename}\nFile chunk: ${chunkNo}`);

  const response = await axios.post(telegramApiUrl, formData, {
    headers: formData.getHeaders(),
  });
  const result = response.data;

  if (response.status !== 200 || !result.ok) {
    return { success: false };
  }
  return { success: true, fileId: result.result.document.file_id };
}

export async function sendMainFileToTelegram(data: object, filename: string, chunkCount: number): Promise<{ success: boolean; fileId?: string }> {
  const jsonBlob = JSON.stringify(data, null, 2);
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendDocument`;
  const formData = new FormData();
  formData.append("chat_id", channelId);
  formData.append("document", Buffer.from(jsonBlob), `${filename}.json`);
  formData.append("caption", `Name: ${filename}\nTotal chunks: ${chunkCount}`);

  const response = await axios.post(telegramApiUrl, formData, {
    headers: formData.getHeaders(),
  });
  const result = response.data;

  if (response.status !== 200 || !result.ok) {
    return { success: false };
  }
  return { success: true, fileId: result.result.document.file_id };
}

export async function fileData(id: string): Promise<any> {
  const fileMetaUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${id}`;
  const response = await axios.get(fileMetaUrl);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch metadata: ${response.status}`);
  }

  const res: TelegramResponse = response.data;
  if (!res.ok || !res.result?.file_path) {
    throw new Error("Failed to fetch file metadata.");
  }

  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${res.result.file_path}`;
  const fileResponse = await axios.get(fileUrl, { responseType: 'stream' });

  if (fileResponse.status !== 200) {
    throw new Error("Failed to download file from Telegram.");
  }

  return fileResponse;
}
