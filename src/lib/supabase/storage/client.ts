import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression'
import { createSupabaseClient } from '../client';

function getStorage() {
  const {storage} = createSupabaseClient()
  return storage
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
}

export async function uploadImg({file, bucket, folder}: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`

  try {
    file = await imageCompression(file, {
      maxSizeMB: 5
    })
  } catch (error) {
    console.error(error)
    return {imgURL: "", error: "Failed image compression"}
  }

  const storage = getStorage();
  const {data, error} = await storage.from(bucket).upload(path, file);

  if (error) {
    return {imgURL: "", error: "Failed image compression"}
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path  }`;

  return { imageUrl, error: "" };
}