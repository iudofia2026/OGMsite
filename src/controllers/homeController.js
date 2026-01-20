const homeModel = require('../models/homeModel');

const homeController = {
    // GET /
    getHomePage: (req, res) => {
        try {
            const pageData = homeModel.getHomePageData();
            res.render('home', {
                title: 'OGM Tequila - Coming Soon',
                ...pageData
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error loading homepage:', error);
            res.status(500).render('error', {
                title: 'Server Error',
                message: 'Unable to load the homepage.'
            });
        }
    }
};

module.exports = homeController;
