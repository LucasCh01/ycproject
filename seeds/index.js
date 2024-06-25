const PORT = 3000
const cities = require('./cities')
const mongoose = require('mongoose')
const Campground = require('../models/campground')
const { descriptors, places } = require('./seedHelpers')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)]


const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '664fdcd591de8b0499aacb1f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dwdmk9gjh/image/upload/v1717858740/YelpCamp/de4rph3khbqejbehiama.jpg',
          filename: 'YelpCamp/de4rph3khbqejbehiama',
        },
        {
          url: 'https://res.cloudinary.com/dwdmk9gjh/image/upload/v1717858743/YelpCamp/nwgmxdddjdgmb9npca4d.jpg',
          filename: 'YelpCamp/nwgmxdddjdgmb9npca4d',
        },
        {
          url: 'https://res.cloudinary.com/dwdmk9gjh/image/upload/v1717858744/YelpCamp/sfnkltdt1yvnvx2jpzwe.jpg',
          filename: 'YelpCamp/sfnkltdt1yvnvx2jpzwe',
        }
      ],
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae repellat harum consequuntur nihil animi deserunt praesentium eligendi cumque, doloremque unde quasi sint quae ullam libero accusamus ipsa et expedita natus!',
      price
    })
    await camp.save()
  }
}

seedDB().then(() => mongoose.connection.close());
