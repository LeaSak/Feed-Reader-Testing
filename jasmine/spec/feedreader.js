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
                expect(feed.url).toBeTruthy();
            })
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have a name property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            })
        });

         it('should have a color property', function(){
            allFeeds.forEach(function(feed){
                expect(feed.color).toBeTruthy();
            });
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var body = $('body');
        var menuicon = $('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should toggle on click', function() {
            // trigger click event on menu icon
            menuicon.click();
            // body shouldn't have menu-hidden class
            expect(body.hasClass('menu-hidden')).toBe(false);
            // trigger click event on menu icon
            menuicon.click();
            // body should have menu-hidden class
            expect(body.hasClass('menu-hidden')).toBe(true);

        });

         it('should hide when user selects RSS Feed', function(){
            // display menu
            menuicon.click();
            // trigger click event on one element
            $('.feed-list li a:first').click()
            expect(body.hasClass('menu-hidden')).toBe(true);
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
            // envoke loadFeed function, pass done callback
            loadFeed(0, done);
        });

        // This spec will not start until the done function is called
        // In the beforeEach function above.
        it('should have an .entry element', function(done) {
            var feedLen = $('.feed .entry').length;
            expect(feedLen).toBeGreaterThan(0);
            done();
        })
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var first;
        beforeEach(function(done) {
            // envoke loadFeed function, pass done callback
            loadFeed(0, function() {
                //store href for RSS Feed index 1
                first = $('.entry-link').attr('href');
                first_header_color = $('.header').attr('style');
                first_menu_color = $('.slide-menu').attr('style');
                console.log(first, first_header_color, first_menu_color);
                done();
            });
        });

        // reset default load to index 1
        afterAll(function(done) {
            loadFeed(0, done);
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

        it('should update header and menu background colors', function(done){
            loadFeed(1, function() {
                    var second_header_color = $('.header').attr('style');
                    var second_menu_color = $('.slide-menu').attr('style');
                    expect(first_header_color).not.toEqual(second_header_color);
                    expect(first_menu_color).not.toEqual(second_menu_color);
                    done();
                });
        });

    });

}());
