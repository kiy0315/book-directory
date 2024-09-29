const express = require('express')
const { body, param, validationResult } = require('express-validator')

const bookService = require('./bookService');


const router = express.Router();
router.use(express.json());

const validateBook = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty())
        return next()

    return res.status(400).json({ errors: error.array() })
}


router
    .route('/')
    .get(validateBook, (req, res) => {
        bookService.getAllBooks((err, result) => {
            if (err) {
                return res.status(400).json({ err: err.message })
            }
            if (result.length) {
                return res.status(200).json(result)
            }
            return notFoundPage(res);
        })
    })
    .post(
        [
            body('title').notEmpty().isString().withMessage("책의 제목을 입력하세요"),
            body('price').notEmpty().isInt().withMessage("가격을 입력하세요"),
            validateBook
        ]
        , (req, res) => {
            const { title, price, description, author, genre, summary } = req.body;
            bookService.insertBook({ title, price, description, author, genre, summary },
                (err, result) => {
                    if (err) {
                        return res.status(400).json({ err: err.message })
                    }
                    return res.status(201).json({
                        message: `${title} 책이 등록되었습니다`
                    })
                })
        })

router
    .route('/:id')
    .get(
        [
            param('id').notEmpty().withMessage("등록되지 않은 Book ID입니다"),
            validateBook
        ], (req, res) => {
            let { id } = req.params
            id = parseInt(id)

            bookService.getBookById(id, (err, result) => {
                if (err) {
                    return res.status(400).json({ err: err.message })
                }
                if (result.length) {
                    return res.status(200).json(result)
                }
                return notFoundPage(res)
            }
            )
        })
    .put(
        [
            param('id').notEmpty().withMessage("등록되지 않은 Book ID입니다"),
            validateBook
        ], (req, res) => {

            let { id } = req.params
            id = parseInt(id)

            const { price, description, author, genre, summary } = req.body

            bookService.updateBook(id, { price, description, author, genre, summary },
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ err: err.message })
                    }
                    if (result.affectedRows) {
                        return res.status(200).json({
                            message: '책 정보가 수정되었습니다.'
                        })
                    }
                    return notFoundPage(res)
                }
            )
        })
    .delete(
        [
            param('id').notEmpty().withMessage("등록되지 않은 Book ID입니다"),
            validateBook
        ], (req, res) => {
            let { id } = req.params
            id = parseInt(id)

            bookService.deleteBook(id,
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