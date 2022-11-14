import { AddPhotoAlternate } from "@mui/icons-material";
import { CardActionArea, Fab } from "@mui/material";
import Image from "next/image";
import { Dispatch, Fragment } from "react";


interface PhotoLoaderProps {
    images: any[],
    setImages: Dispatch<any[]>
}
export const PhotoLoader = ({ images, setImages }: PhotoLoaderProps) => {
    const handleUploadClick = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImages([...images, reader.result]);
        }.bind(this);
    };

    return (
        <Fragment>
            {
                images.map((photo, index) => (
                    <Image
                        key={index}
                        width="300px"
                        height={'300px'}
                        src={photo}
                        alt={'photo'}
                    />
                ))
            }
            <CardActionArea >
                <input
                    accept="image/jpeg"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                    <Fab component="span" >
                        <AddPhotoAlternate />
                    </Fab>
                </label>
            </CardActionArea>
        </Fragment>
    );
}