const productsModel = {
    getProductsPageData: () => {
        return {
            products: [
                {
                    id: 'premium',
                    name: 'OGM: Premium Reposado',
                    color: 'premium',
                    price: '$45.00',
                    image: '/images/OGM_Labels_Premium_Full Front.png',
                    description: 'Premium Reposado Tequila'
                },
                {
                    id: 'ginger-lime',
                    name: 'OGM: Ginger Lime',
                    color: 'ginger-lime',
                    price: '$42.00',
                    image: '/images/OGM_Labels_Ginger Lime_Full Front.png',
                    description: 'Ginger Lime Infused'
                },
                {
                    id: 'jalapeno',
                    name: 'OGM: Jalapeño Reposado',
                    color: 'jalapeno',
                    price: '$44.00',
                    image: '/images/OGM_Labels_Jalapeno_Full Front.png',
                    description: 'Jalapeño Infused'
                }
            ],
            pageTitle: 'OGM Premium Collection',
            title: 'Discover the OGM Collection',
            subtitle: 'Premium reposado tequila crafted with passion, served with pride. Experience our bold, natural flavors.',
            ctaText: 'Explore Our Spirits'
        };
    }
};

module.exports = productsModel;