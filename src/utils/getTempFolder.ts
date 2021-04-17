import fs from "fs";
import os from "os";

export const getTempFolder = (): string => {
  let uploadDirectory = os.tmpdir();
  const tempDirectoryExists = fs.existsSync(uploadDirectory);
  console.log("Temp directory exists? ", tempDirectoryExists);
  if (tempDirectoryExists) {
    console.log("Temp directory: ", uploadDirectory);
    uploadDirectory = uploadDirectory.toString();
    if (uploadDirectory.includes(":"))
      uploadDirectory = uploadDirectory.split(":")[1];
  } else {
    uploadDirectory = "uploads/";
    if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory);
  }
  console.log("Upload directory: ", uploadDirectory);
  return uploadDirectory;
};
