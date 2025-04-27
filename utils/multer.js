const multer = require("multer");
const path = require('path');
const fs = require("fs");

if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync('./public/uploads');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error with delete files: ", err);  // Печать конкретной ошибки
      } else {
        console.log("File deleted successfully!");
      }
    });
  } else {
    console.log("File does not exist!");
  }
}

module.exports = {
  storage,
  upload,
  deleteFile
}

// deleteFile("public/uploads/1745772882374_logo.png");