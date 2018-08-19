/**
 * Dependencies
 * @jquery v3.3.1 - not connected
 * @bootstrap v3.3.7 - not connected
 * @lodash v4.17.5 - not connected
 * @axios v0.18.0 - not connected
 */

//@ ../../bower_components/bootstrap/dist/js/bootstrap.js


/**
 * Custom scripts
 */

//= script/menu.js
//= script/gallery.js
//= script/sidebar.js
//= script/blog.js
//= script/randomPost.js
//= script/validation.js




window.addEventListener('load', function () {
    var menu = new Menu();
    menu.menuRender();


    var gallery = new Gallery();
    gallery.galleryRender();
    gallery.openPanel();
    gallery.likeInc();
    gallery.mobileVersion();

    var sidebar = new SidebarControl();
    sidebar.render();

    var blog = new Blog();
    blog.render();

    var randomPost = new RandomPost();
    randomPost.render();

    var valid = new ValidData();
    valid.checking();
});