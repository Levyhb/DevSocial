const fs = require("fs");

const removeImg = async (imagePath) => {
  fs.unlink(`public/images/${imagePath}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Image removed successfully!");
  });
};

module.exports = {
  removeImg
}