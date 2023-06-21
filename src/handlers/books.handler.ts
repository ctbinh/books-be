import { RawHandler } from "@interfaces";
import { CreateBookDto } from "src/dtos/in/book.dto";
import moment from 'moment';
import { elasticClient } from "src/elasticsearch/elasticClient";
import { ElasticSearchIndex } from "src/constants/elasticsearch";
import { BookRawResultDto, BookResultDto } from "@dtos/out";

const create: RawHandler<string, { Body: CreateBookDto }> = async (req, res) => {
    try {
        const result = await elasticClient.index({
            index: ElasticSearchIndex.BOOKS,
            document: {
                title: req.body.title,
                author: req.body.author,
                publishedDate: moment().unix(),
                description: req.body.description,
                price: req.body.price,
                imageUrl: req.body.imageUrl
            }
        })
        return result._id
    } catch (err) {
        req.log.debug(err);
        return res.badRequest(err.message);
    }
};

const getList: RawHandler<(BookResultDto | undefined)[]> = async (req, res) => {
    try {
        const result = await elasticClient.search<BookRawResultDto>({
            index: ElasticSearchIndex.BOOKS,
            body: {
                query: { match_all: {} }
            }
        })
        const books = result.hits.hits.map(hit => {
            if(hit._source !== undefined) return {
                id: hit._id,
                ...hit._source
            }
        })
        return books
    } catch (err) {
        if(err.statusCode === 404) {
            return [];
        }
        req.log.debug(err);
        return res.badRequest(err.message);
    }
};

const getById: RawHandler<BookResultDto | null, {Params: {bookId: string}}> = async (req) => {
    const bookId = req.params.bookId
    const result = await elasticClient.get<BookRawResultDto>({
        index: ElasticSearchIndex.BOOKS,
        id: bookId
    })
    if(result._source !== undefined) return {id: result._id, ...result._source}
    return null
};

const update: RawHandler<string, {Params: {bookId: string}, Body: CreateBookDto}> = async (req) => {
    const bookId = req.params.bookId
    const result = await elasticClient.update<BookRawResultDto>({
        index: ElasticSearchIndex.BOOKS,
        id: bookId,
        body: {
            doc: req.body
        }
    })
    return result._id
};

export const bookHandler = {
    create,
    getList,
    getById,
    update,
};