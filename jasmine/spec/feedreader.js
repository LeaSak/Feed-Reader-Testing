/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            })
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var body = $('body');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('should toggle on click', function() {
            var menuicon = $('.menu-icon-link');

            // trigger click event on menu icon
            menuicon.click();
            // body shouldn't have menu-hidden class
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            // trigger click event on menu icon
            menuicon.click();
            // body should have menu-hidden class
            expect(body.hasClass('menu-hidden')).toBeTruthy();

        });



    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // clear .feed container first
            $('.feed').empty();
            // envoke loadFeed function, pass done callback
            loadFeed(0, done);
        });

        // This spec will not start until the done function is called
        // In the beforeEach function above.
        it('should have an .entry element', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        })
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var first;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function(done) {
            // clear .feed container first
            $('.feed').empty();
            // envoke loadFeed function, pass done callback
            loadFeed(0, function() {
                //store href for RSS Feed index 1
                first = $('.entry-link').attr('href');
                done();
            });
        });

        // This spec will not start until the done function is called
        // In the beforeEach function above.
        it('should update content on load', function(done) {
            loadFeed(1, function() {
                    //store href for RSS Feed index 1
                    var second = $('.entry-link').attr('href');
                    // compare hrefs
                    expect(first).not.toEqual(second);
                    // this signals to jasmine that this is the test
                    // dependent on the async response
                    done();
                });
        });

        // reset default load to index 1
        afterAll(function(done) {
            loadFeed(0, done);
        });

    });

}());