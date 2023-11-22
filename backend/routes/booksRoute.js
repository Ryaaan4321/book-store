import express from 'express';
import { Book } from '../models/bookmodels.js';

const router = express.Router();

// Route for save a new Book;
router.post('/', async (request, reponse) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return reponse.status(400).send({
                message: 'Send all required fields:title,author,publishYear',


            });

        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const books = await Book.create(newBook);
        return reponse.status(201).send(books);

    } catch (error) {
        console.log(error.message);
        reponse.status(500).send({ message: error.message });

    }

})
// ROUTE TO GET ALL BOOKS FROM DATABASE;
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// ROUTE TO GET ONE BOOK FROM DATABASE BY ID;
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//ROUTE FOR UPDATE A BOOK;
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title,author, publisYear',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated succesfuly' });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

// ROUTE FOR DELETING A BOOK;

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book deleted Succesfuly' });

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;
