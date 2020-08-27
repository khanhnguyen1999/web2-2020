const User = require("../services/user");
const Account = require("../services/account");
const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");
var fileupload = require("express-fileupload");

router.use(
    fileupload({
        useTempFiles: true,
    })
);

const cloudinary = require("cloudinary").v2;
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    },
});

cloudinary.config({
    cloud_name: "hvcg-company",
    api_key: "794948648774347",
    api_secret: "rL1mGGSMO81nmMBzJq7j7TaeLLs",
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("myImage");

// Check File Type
router
    .route("/")
    .get((req, res) => {
        res.render("ducbui/pages/auth/verify", { errors: null });
    })
    .post((req,res)=>{
        const {photo}= req.files
        const {userId} = req.body;
        const file =photo;
        
        if (file.mimetype.slice(0, 5) === "image") {
            // upload image here
            cloudinary.uploader
                .upload(file.tempFilePath)
                .then(async (result) => {
                    await User.update(
                        {
                            idCardPhoto: result.secure_url,
                        },
                        {
                            where: {
                                id: userId,
                            },
                        }
                    ).then(async (data) => {
                        res.json({success:true, user :data})
                        await Account.update(
                            {
                                status: "PENDING",
                            },
                            {
                                where: {
                                    userId: userId,
                                },
                            }
                        );
                        return;
                    });
                    return res.json({success:true, result :data.secure_url});
                })
                .catch((error) => {
                    res.json({success:false});
                });
        } else {
            return res.json({success:false});
        }
    });

module.exports = router;