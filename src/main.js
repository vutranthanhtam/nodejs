import express from "express";
const app = express();

import { readFileSync, writeFileSync } from 'fs'

import bodyParser from "body-parser";
app.use(bodyParser.json());

app.post("/student" , (req, res) => {
    try{
         let students = JSON.parse(readFileSync("student.json", "utf-8"))
         let newStudent = {
            ...req.body,
            id: students.length + 1
         }
         students.push(newStudent)
         
         writeFileSync("student.json", JSON.stringify(students))
         return res.status(200).json({
             message: " Thêm sinh viên thành công ",
             data: newStudent
         })
 
    }catch(err){
        res.status(500).json({
         message: "Lỗi",
        })
    }
 })

 app.patch("/student/:id" , (req, res) => {
    try{
         let students = JSON.parse(readFileSync("student.json", "utf-8"))
         let temp = null
         students = students.map(item => {
            if(item.id == req.params.id) {
                temp = Object.assign(item, req.body)
                return Object.assign(item, req.body)
            }
            return item
         })
         writeFileSync("student.json", JSON.stringify(students))
         return res.status(200).json({
             message: ` Cập nhập sinh viên có id là ${req.params.id} thành công `,
             data: temp
         })
 
    }catch(err){
        res.status(500).json({
         message: "Lỗi",
        })
    }
 })

 app.put("/student/:id" , (req, res) => {
    try{
         let students = JSON.parse(readFileSync("student.json", "utf-8"))
         let temp = null
         students = students.map(item => {
            if(item.id == req.params.id) {
                return {
                    ...req.body,
                    id: req.params.id
                }
            }
            return item
         })
         writeFileSync("student.json", JSON.stringify(students))
         return res.status(200).json({
             message: ` Cập nhập sinh viên có id là ${req.params.id} thành công `,
             data: {
                ...req.body,
                id: req.params.id
             }
         })
 
    }catch(err){
        res.status(500).json({
         message: "Lỗi",
        })
    }
 })

 app.delete("/student/:id" , (req, res) => {
    try{
         let students = JSON.parse(readFileSync("student.json", "utf-8"))
         students = students.filter(item => item.id != req.params.id)
         writeFileSync("student.json", JSON.stringify(students))
         return res.status(200).json({
            message: ` Xóa sinh viên có id là ${req.params.id} thành công `,
            data: null
         })
    }catch(err){
        res.status(500).json({
         message: "Lỗi",
        })
    }
 })

app.get("/student" , (req, res) => {
   try{
        let studentId = req.query.id
        if(studentId) {
            let student = JSON.parse(readFileSync("student.json", "utf-8")).find(item => item.id == studentId)
            return res.status(student ? 200 : 500).json({
                message: student ? " Lấy thông tin sinh viên có id là " + studentId + " thành công " : " Không tìm thấy thông tin sinh viên ",
                data: student ? student : null
            })
        }

        let students = JSON.parse(readFileSync("student.json", "utf-8"))
        return res.status(200).json({
            message: " Lấy danh sách sinh viên thành công ",
            data: students
        })

   }catch(err){
       res.status(500).json({
        message: "Lỗi",
       })
   }
})

app.get("/", (req, res) => {
    res.send("Hello World 1")
})

app.use("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server on at: http://127.0.0.1:3000");
})