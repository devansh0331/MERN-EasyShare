const File = require("../models/file");


const uploadImage = async (req,res) => {
//    return res.status(200).json({mssg:"Hello"})
    const fileObj = {
        path: req.file.path,
        name : req.file.originalname

    }
   
    try{
        const file = await File.create(fileObj)
        console.log(file);
        res.json({path : `http://localhost:5000/file/${file._id}`})
    }
    catch(err){
        console.log("Error: " + err);
        res.json({error : `${err}` , status: 400})
    }

}

const downloadImage = async (req,res) => {
    try{
        const file = await File.findById(req.params.fileId)
        file.downloads++;
        await file.save()
        res.download(file.path , file.name)
    }
    catch (err){
        console.error(err.message);
        return res.json({mssg: `Error: ${err}` , status:400})

    }
}
module.exports = {uploadImage , downloadImage}