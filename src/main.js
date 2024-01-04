import express from "express";
const main = express();

main.listen(3000, () => {
    console.log("Server on at: http://127.0.0.1:3000");
})