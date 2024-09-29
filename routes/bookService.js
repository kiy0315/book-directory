const connection = require('../database/db')

const getAllBooks = (callback) => {
    connection.query('SELECT * FROM books', callback)
}

const getBookById = (id, callback) => {
    connection.query('SELECT * FROM books WHERE id = ?', [id], callback)
}

const insertBook = (book, callback) => {
    const { title, price, description, author, genre, summary } = book

    connection.query('INSERT INTO books (title,price,description,author,genre,summary) VALUES(?,?,?,?,?,?)',
        [title, price, description, author, genre, summary],
        callback
    );
}

const updateBook = (id, book, callback) => {
    const { price, description, author, genre, summary } = book;
    connection.query(
        'UPDATE books SET price = ?, description = ?, author = ?, genre = ?, summary =? WHERE id = ?',
        [price, description, author, genre, summary, id],
        callback
    );
};

const deleteBook = (id, callback) => {
    connection.query('DELETE FROM books WHERE id = ?', [id], callback);
};

module.exports = {
    getAllBooks,
    getBookById,
    insertBook,
    updateBook,
    deleteBook
};