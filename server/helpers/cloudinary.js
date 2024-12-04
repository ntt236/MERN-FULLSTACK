const cloudinary = require('cloudinary').v2;

const multer = require('multer');

cloudinary.config({
    cloud_name: "dqtre0ccw",
    api_key: '458262847542578',
    api_secret: "tP7Zo1fHIFHA0EdbRNRjmYpysxY"
});

const storage = new multer.memoryStorage()

const imageUploadUtils = async (file) => {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    })
    return result;

}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtils }


