const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '628ae199c28bcd246459a5bc',
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error eos porro consectetur iusto asperiores. Repudiandae cupiditate, excepturi maxime nam voluptates, corporis non accusamus quas doloribus animi minus! At, minus sed. Magnam reiciendis dignissimos ullam officiis odit similique laudantium ducimus odio totam delectus dolores, dolor molestias, natus quas nisi qui debitis, illo quaerat eius iste ab ipsum sunt porro recusandae! Voluptas.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvd6z8jvw/image/upload/v1653421052/YelpCamp/v6tc2guptdcfiabpxwjj.jpg',
                    filename: 'YelpCamp/v6tc2guptdcfiabpxwjj',
                },
                {
                    url: 'https://res.cloudinary.com/dvd6z8jvw/image/upload/v1653421063/YelpCamp/ami6hdtzjbynbh4t0oh8.png',
                    filename: 'YelpCamp/ami6hdtzjbynbh4t0oh8',
                }
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});