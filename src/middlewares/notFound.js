/**
 * 404 Not Found middleware
 */
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.originalUrl,
    });
};

module.exports = notFound;
