const express = require('express')
const { body, param, validationResult } = require('express-validator')


const connection = require('../database/db')

const router = express.Router();


router.use(express.json());


router
    .route('/')
    .get((req, res) => {
        connection.query('SELECT * FROM books', (err, result) => {
            if (err) {
                return res.status(400).json({ err: err.message })
            }
            if (result.length) {
                return res.status(200).json(result)
            }
            return notFoundPage(res);
        })
    })
    .post((req, res) => {
        const { title, price, description, author, genre } = req.body;

        if (title) {
            connection.query('INSERT INTO books (title,price,description,author,genre) VALUES(?,?,?,?,?)', [title, price, description, author, genre],
                (err, result) => {
                    if (err) {
                        return res.status(400).json({ err: err.message })
                    }
                    return res.status(201).json({
                        message: `${title} 책이 등록되었습니다`
                    })
                })
        }
        else {
            return res.status(400).json({
                message: '책의 제목을 입력해주세요'
            })
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        let { id } = req.params
        id = parseInt(id)

        connection.query(
            'SELECT * FROM books where id = ?', [id], (err, result) => {
                if (err) {
                    return res.status(400).json({ error: error.message })
                }
                if (result.length === 0) {
                    return notFoundPage(res)
                }
                return res.status(200).json(result)
            }
        )
    })
    .put((req, res) => {

        let { id } = req.params
        id = parseInt(id)

        const { price, description, author, genre } = req.body
        connection.query(
            'UPDATE books SET price = ?, description = ?, author = ?, genre = ? where id = ?',
            [price, description, author, genre, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ err: err.message })
                }
                if (result.affectedRows === 0) {
                    return notFoundPage(res)
                }
                return res.status(200).json({
                    message: '책 정보가 수정되었습니다.'
                })
            }
        )
    })
    .delete((req, res) => {
        let { id } = req.params
        id = parseInt(id)

        connection.query(
            'DELETE FROM books where id = ?', [id],
            (err, result) => {
                if (err) {
                    return res.status(400).json({ err: err.message });
                }
                if (result.affectedRows) {
                    return res.status(200).json({
                        message: '책을 삭제했습니다.'
                    })
                }
                return notFoundPage(res)
            })
    })

function notFoundPage(res) {
    return res.status(404).json({
        message: "책의 정보를 찾을 수 없습니다."
    })
}
module.exports = router