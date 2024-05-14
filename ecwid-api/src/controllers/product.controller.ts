import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { json2csv } from 'json-2-csv';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProduct = await productService.getAll();
        res.json(allProduct);
    } catch (e) {
        next(e);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productService.getOne(id);
        res.json(product);
    } catch (e) {
        next(e);
    }
};

export const exportProductsToCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = req.body.products;

        const options = {
            keys: [
                { field: 'id', title: 'ID' },
                { field: 'name', title: 'Name' },
                { field: 'price', title: 'Price' }
            ],
            delimiter: {
                field: ',',
                wrap: '"',
                eol: '\n'
            },
            checkSchemaDifferences: false,
            emptyFieldValue: '',
            expandArrayObjects: true,
            prependHeader: true,
            trimFieldValues: true,
            trimHeaderFields: true,
            excelBOM: true,
            expandNestedObjects: true
        };

        const csv = json2csv(products, options);

        res.header('Content-Type', 'text/csv');
        res.attachment('products.csv');
        res.send(csv);
    } catch (e) {
        next(e);
    }
};