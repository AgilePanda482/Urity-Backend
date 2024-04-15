// Middleware para manejar errores 404
export const handle404 = (req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
};

// Middleware para manejar todos los errores
export const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "An error occurred",
        status: error.status
    });
};
