# Neighborhood Map

### [Live Demo](https://johnlaine1.github.io/udacity-fend-neighborhood-map/)
#### Created by: John Laine

## Description
A project created and submitted as part of the Udacity Front End Developer course.
Upon starting the app, a Google map will be displayed with a number of
pre-set map markers. There is a slide out drawer on the left with a searchable
list of these markers. When a marker of list item is selected, additional information
will appear in an info window above the selected map marker.

## Running the Application
1. Clone the project to your local machine.
2. Be sure to have both npm and bower installed on your machine and then from the command line run `npm install && bower install` to install needed packages.
3. Run `gulp serve:dist` and point your browser to localhost:8080
4. Alternatively you can run just run `gulp` instead of `gulp serve:dist` and point your browser to /dist/index.html
5. This application is also published on github.io and can be viewed [here](https://johnlaine1.github.io/udacity-fend-neighborhood-map/).

## Using the Application
When the app starts you will see a map with various map markers indicating the location of restaurants. Click on a marker to see more information about that restaurant.

Click the hamburger icon in the upper left screen area to open a drawer from the left, here you will find a list of all restaurants along with a search box to narrow down the results.

If you choose 'Exact', only locations that exactly match your search phrase will be shows, if you choose 'Contains', then any location that contains your search phrase will be show.

## Attribution
Location data provided by [FourSquare](https://foursquare.com).

Maps provided by [Google](https://www.google.com/maps)

