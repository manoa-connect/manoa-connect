'use client';

import { Profile } from '@prisma/client';
import { useRef, ChangeEvent, useState, useTransition, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import { uploadImg } from '@/lib/supabase/storage/client';
import { loadImg } from '@/lib/supabase/storage/client';


const UploadForm = ({ profile }: {profile : Profile}) => {
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
    const [currImgs, setCurrImgs] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const imgInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchImages = async () => {
            const { images, error } = await loadImg('manoa-connect-pics', profile.id.toString());

            if (error) {
                console.error(error)
            } else {
                setCurrImgs(images || [])
            }
        };

        fetchImages();
    }, [profile.id]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newImgURLs = filesArray.map((file) => URL.createObjectURL(file))
        
            setImgURLs([...imgURLs, ...newImgURLs])
        }
    }

    const handleClickUpload = () => {
        startTransition(async () => {
            const URLs: (string | undefined)[] = [];
            for (const url of imgURLs) {
                const imgFile = await convertBlobUrlToFile(url);

                const {imgURL, error} = await uploadImg({
                    file: imgFile,
                    bucket: 'manoa-connect-pics',
                    folder: profile.id.toString()
                })

                if (error) {
                    console.error(error)
                    return
                }

                URLs.push(imgURL)
            }

            console.log(URLs);
            setImgURLs([]);
            setCurrImgs((prev) => [...prev, ...URLs.filter((url): url is string => url !== undefined)]);
        });
    };

    return (
    <main className="d-flex align-middle justify-content-center">
        Current Images<br />
        {currImgs.length > 0 ? (
            currImgs.map((url, index) => (
                <Image className="m-2" key={url} src={url} width={300} alt={`img-${index}`} />
            ))
        ) : (
            <p>No images found.</p>
        )}

        <input
            type="file" 
            hidden 
            accept="image/*"
            ref={imgInputRef}
            onChange={handleImageChange}
            disabled={isPending}/>

        <Button 
            onClick={() => imgInputRef.current?.click()}
            disabled={isPending}>
            Select Images
        </Button>  

        <div>
            {imgURLs.map((url, index) => (
                <Image className="m-2" key={url} src={url} width={300} alt={`img-${index}`}/>
            ))}
        </div>

        <Button 
            type="submit"
            onClick={handleClickUpload}
            disabled={isPending}>
            {isPending ? "Uploading . . ." : "Upload Images"}
        </Button>
    </main>
  );
};

export default UploadForm;
// AARON: To display images, I think i need another prisma object to store the URLs based on id
// prisma object is string[], 
