
import shrinkImage from 'browser-image-compression';


const options = {
  mainImg: {
    maxSizeMB: 1, // 1mb file - Only use this for detail view
    maxWidthOrHeight: 1200,
    useWebWorker: false,
  },
  thumbImg: {
    maxSizeMB: 0.2, // 200kb
    maxWidthOrHeight: 400,
    useWebWorker: false,

  },
  avatarImg: {
    maxSizeMB: 0.03, // 30kb
    maxWidthOrHeight: 80,
    useWebWorker: false,

  },
};


export async function compressImage(imageFile, imageType) {
  // imageType should be "mainImg", "thumbImg", or "avatarImg"
  // console.log('original file instanceof Blob', imageFile instanceof Blob);
  // console.log(`original file size:  ${imageFile.size / 1024 / 1024} MB`);

  try {
    const compressedFile = await shrinkImage(imageFile, options[imageType]);
    // console.log('compressed file instanceof Blob', compressedFile instanceof Blob);
    // console.log(`compressed file size:  ${compressedFile.size / 1024 / 1024} MB`);
    return compressedFile;
  } catch (e) {
    /* eslint-disable-next-line */
    console.log(e);
    return e;
  }
}
