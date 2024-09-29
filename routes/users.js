const express = require('express')
const { body, param, validationResult } = require('express-validator')
const conn = require('../database/db')
const userService = require('./userService')

const router = express.Router()
router.use(express.json())

router
    .route('/login')
    .post((req, res) => {
        console.log("로그인페이지 ")
        let { email, password } = req.body
        let sql = 'SELECT * FROM users WHERE email = ?'
     
        userService.loginQuery(email, (err, result) => {
            var loginUser = result[0];

            if (loginUser && loginUser.password == password) {
                if (err)
                    return res.status(400).json({ err: err.message })
                if (result.length) {
                    return res.status(200).json({
                        message: "로그인 성공"
                    })
                }
            } else return res.status(403).json({
                message: "이메일 또는 비밀번호가 틀렸습니다."
            })
        })
    })

router
    .post('/join',
        (req, res) => {
            let { email, name, password, contact } = req.body
            let values = [email, name, password, contact]
            
            userService.joinQuery(values, (err, result) => {
                if (err)
                    return res.status(400).json({ err: err.message })
                return res.status(200).json({
                    message: "회원가입 성공"
                })

            })
        })

// userService.joinQuery is not a function 이런 오류가 나오면 userService에서 모듈을 exports를 안해준것이다.
module.exports = router