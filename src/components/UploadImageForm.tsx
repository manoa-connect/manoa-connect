'use client';

import { useRef, ChangeEvent, useState, useTransition } from 'react';
import { Image } from 'react-bootstrap';
import { uploadImg } from '@/lib/supabase/storage/client';

const UploadForm = () => {

    async function convertBlobUrlToFile(blobUrl: string) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const fileName = Math.random().toString(36).slice(2, 9);
        const mimeType = blob.type || "application/octet-stream";
        const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
          type: mimeType,
        });
        return file;
    }

    const [imgURLs, setImgURLs] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const imgInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newImgURLs = filesArray.map((file) => URL.createObjectURL(file))
        
            setImgURLs([...imgURLs, ...newImgURLs])
        }
    }

    const handleClickUpload = () => {
        startTransition(async () => {
            const URLs = [];
            for (const url of imgURLs) {
                const imgFile = await convertBlobUrlToFile(url);

                const {imgURL, error} = await uploadImg({
                    file: imgFile,
                    bucket: 'manoa-connect-pics'
                })

                if (error) {
                    console.error(error)
                    return
                }

                URLs.push(imgURL)
            }

            console.log(URLs);
            setImgURLs([]);
        })
    }

    return (
    <main className="d-flex align-middle justify-content-center">
        <input
            type="file" 
            multiple
            hidden 
            accept="image/*"
            ref={imgInputRef}
            onChange={handleImageChange}
            disabled={isPending}/>

        <button 
            onClick={() => imgInputRef.current?.click()}
            disabled={isPending}>
            Select Images
        </button>  

        <div>
            {imgURLs.map((url, index) => (
                <Image className="m-2" key={url} src={url} width={300} alt={`img-${index}`}/>
            )) }
        </div>

        <button 
            type="submit"
            onClick={handleClickUpload}
            disabled={isPending}>
            {isPending ? "Uploading . . ." : "Upload Images"}
        </button>
    </main>
  );
};

export default UploadForm;



