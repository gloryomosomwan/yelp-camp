const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const Campground = require('./models/campground');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/campgrounds');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    try {
        res.render('campgrounds/new');
    } catch (error) {
        next(error);
    }
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.post('/campgrounds', (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: "cheap camping" });
    await camp.save();
    res.send(camp);
});

app.use((err, req, res, next) => {
    res.send("Something went wrong");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});