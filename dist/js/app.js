// getting elements from the DOM
const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const select = document.getElementById("lang");
let lang;
select.addEventListener("change", () => {
  lang = select.value;
});

let img = new Image();
let fileName = "";

//Upload File
uploadFile.addEventListener("change", e => {
  // get file
  const file = document.getElementById("upload-file").files[0];

  // init FileReader
  const reader = new FileReader();

  if (file) {
    // set File Name
    fileName = file.name;
    // Read data as url
    reader.readAsDataURL(file);

    // Add image to Canvas
    reader.addEventListener("load", () => {
      // creating the image
      img = new Image();
      img.src = reader.result;

      // on Image load add to Canvas
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        // drawImage(the image itself, when to start from x, ehen to start from y)
        ctx.drawImage(img, 0, 0);
      };

      Tesseract.recognize(img, lang, {
        logger: m => console.log(m)
      }).then(({ data: { text } }) => {
        document.querySelector("#text").innerHTML = text;
      });
    });
  }
});
