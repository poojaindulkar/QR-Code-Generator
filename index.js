import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// GET request handler
app.get("/", (req, res) => {
  res.render("index.ejs", { qrUrl: null ,url:null});
});

// POST request handler
app.post("/", (req, res) => {
  const url = req.body.url;

  var qr_png = qr.image(url, { type: 'png' }); 
  qr_png.pipe(fs.createWriteStream("./public/QR_img.png")); 
  const qrUrl = "QR_img.png";

  res.render("index.ejs", { qrUrl, url });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
