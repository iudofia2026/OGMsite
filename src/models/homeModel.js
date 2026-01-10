const homeModel = {
    // Get data for the homepage
    getHomePageData: () => {
        return {
            beverages: [
                {
                    id: 'premium',
                    name: 'Premium Reposado',
                    description: 'Small batch reposado tequila made with passion, served with pride',
                    color: '#d4af37',
                    frontImage: '/images/OGM_Labels_Premium_Full Front.png',
                    backImage: '/images/OGM_Labels_Full Back.png',
                    backgroundImage: '/images/img-bg-1.jpg'
                },
                {
                    id: 'ginger-lime',
                    name: 'Ginger Lime Reposado',
                    description: 'Refreshing ginger lime reposado tequila with citrus notes',
                    color: '#008080',
                    frontImage: '/images/OGM_Labels_Ginger Lime_Full Front.png',
                    backImage: '/images/OGM_Labels_Full Back.png',
                    backgroundImage: '/images/img-bg-2.jpg'
                },
                {
                    id: 'jalapeno',
                    name: 'Jalapeño Reposado',
                    description: 'Bold jalapeño-infused reposado tequila with a fiery finish',
                    color: '#c53030',
                    frontImage: '/images/OGM_Labels_Jalapeno_Full Front.png',
                    backImage: '/images/OGM_Labels_Full Back.png',
                    backgroundImage: '/images/img-bg-3.jpg'
                }
            ],
            meta: {
                description: 'Premium OGM reposado tequilas with unique flavor profiles and artisanal quality',
                keywords: 'OGM, tequila, reposado, premium, ginger lime, jalapeño, small batch, artisanal'
            }
        };
    }
};

module.exports = homeModel;