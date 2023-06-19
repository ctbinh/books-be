import { TRY_LATER } from "@constants";
import { AuthorizedHandler } from "@interfaces";
import { prisma } from "@repositories";
import { CreateBookDto } from "src/dtos/in/book.dto";
import moment from 'moment';

const create: AuthorizedHandler<string, { Body: CreateBookDto }> = async (req, res) => {
    try {
        const userId = req.headers.userId
        const book = await prisma.book.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                publishedDate: moment().unix(),
                authorId: userId
            },
            select: { id: true }
        });
        return book.id;
    } catch (err) {
        req.log.debug(err);
        res.badRequest(TRY_LATER);
    }
};

export const bookHandler = {
    create,
};