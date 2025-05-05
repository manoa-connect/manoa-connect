import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression'
import { createSupabaseClient } from '../client';
import { redirect } from 'next/navigation';

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
      maxSizeMB: 10
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

  redirect('/upload');
  return { imageUrl, error: "" };
}

export async function deleteImg(imgURL: string) {
  const bucketAndPathString = imgURL.split("/storage/v1/object/public/")[1];
  const firstSlashIndex = bucketAndPathString.indexOf("/");

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).remove([path]);

  return { data, error };
}

export async function loadImg(bucket: string, folder?: string) {
  const storage = getStorage();
  const path = folder ? `${folder}/` : '';

  const { data, error } = await storage.from(bucket).list(path);

  if (error) {
    console.error(error)
  }

  const images = data?.map((file) => {
    console.log(file.name);
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${path}${file.name}`
  });

  return { images, error }
}
