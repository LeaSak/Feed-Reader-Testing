/*
 * feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    'use strict';
    /*
     * Tests RSS Feed properties
     * This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        // Sees if the variable allFeeds exists and has content.
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checks each feed for a url property.
        it('should have a URL property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        // Checks each feed for a name property.
        it('should have a name property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });

        // New expectation. Checks each feed for a color property.
        it('should have a color property', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.color).toBeTruthy();
            });
        });
    });


    /*
     * Menu Test
     */
    describe('The menu', function() {
        var body = $('body');
        var menuicon = $('.menu-icon-link');

        // Checks to see if menu is hidden.
        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // Checks if menu visiblity toggles when user interacts with icon.
        it('should toggle on click', function() {
            // Trigger click event on menu icon.
            menuicon.click();
            // Body shouldn't have menu-hidden class.
            expect(body.hasClass('menu-hidden')).toBe(false);
            // Trigger click event on menu icon.
            menuicon.click();
            // Body should have menu-hidden class
            expect(body.hasClass('menu-hidden')).toBe(true);

        });

        // New expectation. Checks if menu hides after user selects an RSS Feed.
        it('should hide when user selects RSS Feed', function() {
            // Display menu.
            menuicon.click();
            // Trigger click event on one element.
            $('.feed-list a:first').click();
            // Menu should now be hidden.
            expect(body.hasClass('menu-hidden')).toBe(true);
        });


    });

    /*
     * Initial Entries Test
     */
    describe('Initial Entries', function() {
        /* *
         * Checks for at least one single .entry element within the
         * feed container after the loadFeed function completes.
         * @async loadFeed
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have an .entry element', function(done) {
            var feedLen = $('.feed .entry').length;
            expect(feedLen).toBeGreaterThan(0);
            // Signal to jasmine that this test is async dependent.
            done();
        });
    });

    /**
     * New Feed Selection Test
     */
    describe('New Feed Selection', function() {
        /*
         * Checks that the loadFeed() function triggers a content update.
         */
        var first, first_header_color, first_menu_color;

        /*
         * Trigger async function.
         * Store initial href, header color and menu color values.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                first = $('.entry-link').attr('href');
                first_header_color = $('.header').attr('style');
                first_menu_color = $('.slide-menu').attr('style');
                done();
            });
        });

        // Reset default load to index 1.
        afterAll(function(done) {
            loadFeed(0, done);
        });

        /*
         * Check if href attribute changes if loadFeed is envoked
         * with a new index number.
         */
        it('should update content on load', function(done) {
            loadFeed(1, function() {
                // Store href for RSS Feed index 1
                var second = $('.entry-link').attr('href');
                // Compare href values.
                expect(first).not.toEqual(second);
                // Signal to jasmine that this test is async dependent.
                done();
            });
        });

        /*
         * New expectation.
         * Check if loadFeed() changes the background colors of the menu
         * and header.
         */
        it('should update header and menu background colors', function(done) {
            loadFeed(1, function() {
                // Store a reference to header color.
                var second_header_color = $('.header').attr('style');
                // Store a reference to menu color.
                var second_menu_color = $('.slide-menu').attr('style');
                // Compare header color values.
                expect(first_header_color).not.toEqual(second_header_color);
                // Compare menu color values.
                expect(first_menu_color).not.toEqual(second_menu_color);
                // Signal to jasmine that this test is async dependent.
                done();
            });
        });

    });

}());