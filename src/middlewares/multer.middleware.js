import path from "path";
import multer from "multer";


const storage = multer.diskStorage({
    destination: path.join(process.cwd(), "./src/images"),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

export default upload;