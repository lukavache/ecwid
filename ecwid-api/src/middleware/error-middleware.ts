import ApiError from "../exceptions/api-errors";

const errorMiddleware = (err: any, req: any, res: any, next: any) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    console.log(err);
    return res.status(500).json({message: 'Unexpected error occurred'})

};

export default errorMiddleware;