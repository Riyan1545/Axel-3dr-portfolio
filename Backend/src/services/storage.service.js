const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName){
    const result = await imagekit.upload({
        file: file,
        fileName: fileName,
    });
    return {
        url: result.url,
        fileId: result.fileId
    }
}

async function deleteFile(fileId){
    return await imagekit.deleteFile(fileId)
}

module.exports = {
    uploadFile,
    deleteFile
}