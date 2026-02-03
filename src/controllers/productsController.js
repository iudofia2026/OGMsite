const productsModel = require('../models/productsModel');

const productsController = {
    // GET /products
    getProductsPage: (req, res) => {
        try {
            const pageData = productsModel.getProductsPageData();
            res.render('products', {
                layout: false, // Disable layout system
                title: 'OGM Premium Collection',
                ...pageData
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error loading products page:', error);
            res.status(500).render('error', {
                title: 'Server Error',
                message: 'Unable to load the products page.'
            });
        }
    }
};

module.exports = productsController;