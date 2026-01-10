const homeModel = require('../models/homeModel');

const homeController = {
    // GET /
    getHomePage: (req, res) => {
        try {
            const pageData = homeModel.getHomePageData();
            res.render('home', {
                title: 'OGM - Premium Craft Beverages',
                ...pageData
            });
        } catch (error) {
            console.error('Error loading homepage:', error);
            res.status(500).render('error', {
                title: 'Server Error',
                message: 'Unable to load the homepage.'
            });
        }
    }
};

module.exports = homeController;