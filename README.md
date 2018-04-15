# FEND Feed Reader Testing
This is project six of the Frontend Web Development Nanodegree at Udacity. The aim of the project was to develop test suites using **jasmine.js** for a web-based application that reads RSS feeds. The tests should test the underlying business logic of the application as well as the event handling and DOM manipulation.

<p align="center">
  <img width="auto" height="auto" src="https://github.com/LeaSak/Feed-Reader-Testing/blob/master/screenshot-jasmine.png?raw=true" alt="Jasmine Results Screenshot">
</p>

### Getting started
------

First go to the master branch of the project and get a copy of the repository by either downloading the zipped project files to your computer or via the command line.

```sh
https://github.com/LeaSak/Feed-Reader-Testing
```
To run the app, open **index.html** in your browser. You should be able to see the results of the tests appended to the bottom of the page.

### Tests
------

Obligatory tests include:
* Tests to see that the `allFeeds` array is defined and not empty.
* Tests to see that the objects in the `allFeeds` array have a name and url defined and that these are not empty.
* A test to see that the menu element is hidden by default.
* A test to see that the menu visibility toggles when the menu icon is clicked.
* Tests to see that an async function loads content and that this content is updated.

Additional tests include:
* A test to check that menu is hidden when a user selects an RSS Feed from the menu.

### New feature and tests
------
Each RSS is assigned a color property. The background color of the header and menu is updated to the color property of the RSS Feed when it is loaded.

Tests for this feature include:
* A test to see that the objects in the `allFeeds` array have a color property and that this is not empty.
* A test to see that the background color property of the menu and header elements change when an RSS Feed is loaded.

### Resources
------

[Jasmine JavaScript Testing Framework](https://jasmine.github.io/)

