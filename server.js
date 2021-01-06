const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const MulFileSchema = require("./schema");
const { randomBytes } = require("crypto");
const port = process.env.PORT || 3030;

mongoose
  .connect(
    "mongodb+srv://ahamed-kbr:Xa1i2nPkmpUMyGBs@cluster0.ixvel.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((suc) => console.log("Connected to MongoDB."))
  .catch((err) => console.log(err));

const server = express();

const validTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // in validTypes array first three for image.So for index 0,1,2 it will be image
    if (validTypes.indexOf(file.mimetype) < 3) {
      cb(null, "./uploads/Images");
    } else {
      cb(null, "./uploads/Documents");
    }
  },
  filename: (req, file, cb) => {
    randomBytes(12, (err, buf) => {
      if (err) return console.log(err);
      cb(null, buf.toString("hex") + "." + file.originalname.split(".").slice(-1));
    });
  },
});
const fileFilter = (req, file, cb) => {
  if (validTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.extensionError = "Invalid File Format";
    return cb(null, false, req.extensionError);
  }
};

server.post(
  "/upload",
  multer({ storage: storage, fileFilter: fileFilter }).array("inputfile"),
  (req, res) => {
    if (req.extensionError) {
      return res.status(400).send({ error: "Invaild File format" });
    }
    for (var i = 0; i < req.files.length; i++) {
      let newFile = new MulFileSchema({
        file: { filePath: req.files[i].path, contentType: req.files[i].mimetype },
      });
      console.log(req.files[i]);
      newFile
        .save()
        .then((suc) => {
          console.log("Success");
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send({ error: "Upload error" });
        });
    }
    res.status(200).send({ message: "Upload Successful" });
  }
);

if (process.env.NODE_ENV == "production") {
  server.use(express.static("mul-file-frontend/build"));
  const path = require("path");
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "mul-file-frontend", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log("Working Directory:"+ process.cwd());
  console.log("server.js is running at Port:" + port);
});
