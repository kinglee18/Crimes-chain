import { AddPhotoAlternate } from "@mui/icons-material";
import { CardActionArea, Fab } from "@mui/material";
import Image from "next/image";
import { Dispatch, Fragment, SyntheticEvent } from "react";


interface PhotoLoaderProps {
    images: any[],
    setImages: Dispatch<any[]>
}
export const PhotoLoader = ({ images, setImages }: PhotoLoaderProps) => {
    const handleUploadClick = (event: any) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImages([...images, reader.result]);
        }.bind(this);
        setImages([...images, event.target.files[0]]);
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
                    accept="image/*"
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