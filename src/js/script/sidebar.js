'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sidebar = function () {
    function Sidebar(items) {
        _classCallCheck(this, Sidebar);

        this.items = items;
    }

    _createClass(Sidebar, [{
        key: 'render',
        value: function render() {
            var sidebar = '';

            if (this.items) {
                this.items.forEach(function (item) {
                    sidebar += '<div class="sidebar_tab">' + item.text + ' (<span class="sidebar_count">' + item.count + '</span>)</div>';
                    sidebar += '<div class="sidebar_content">' + item.insideContent.render() + '</div>';
                });
            }

            return sidebar;
        }
    }]);

    return Sidebar;
}();

var SidebarUpLevel = function () {
    function SidebarUpLevel(items) {
        _classCallCheck(this, SidebarUpLevel);

        this.items = items;
    }

    _createClass(SidebarUpLevel, [{
        key: 'render',
        value: function render() {
            var categoriesContainer = '';

            if (this.items) {
                this.items.forEach(function (item) {
                    categoriesContainer += '<div class="sidebar_inside_tab">' + item.month + ' (<span class="sidebar_inside_count">' + item.count + '</span>)</div>';
                    categoriesContainer += '<div class="sidebar_inside_content">' + item.content.render() + '</div>';
                });
            }

            return categoriesContainer;
        }
    }]);

    return SidebarUpLevel;
}();

var SidebarDownLevel = function () {
    function SidebarDownLevel(items) {
        _classCallCheck(this, SidebarDownLevel);

        this.items = items;
    }

    _createClass(SidebarDownLevel, [{
        key: 'render',
        value: function render() {
            var linkContainer = '<div class="sidebar_link_container">';

            if (this.items) {
                this.items.forEach(function (item) {
                    linkContainer += item.render();
                });
            }

            linkContainer += '</div>';
            return linkContainer;
        }
    }]);

    return SidebarDownLevel;
}();

var SidebarLink = function () {
    function SidebarLink(href, title) {
        _classCallCheck(this, SidebarLink);

        this.title = title;
        this.href = href;
    }

    _createClass(SidebarLink, [{
        key: 'render',
        value: function render() {
            return '<a class="sidebar_link" href="' + this.href + '" target="_blank">' + this.title + '</a>';
        }
    }]);

    return SidebarLink;
}();

var SidebarControl = function () {
    function SidebarControl() {
        _classCallCheck(this, SidebarControl);

        this.$categories = '.sidebar_categories .sidebar_tab';
        this.$archive = '.sidebar_archive .sidebar_tab';
        this.$insideContent = '.sidebar_content .sidebar_inside_tab';
    }

    _createClass(SidebarControl, [{
        key: 'render',
        value: function render() {
            var self = this;

            $.ajax({
                type: 'get',
                url: './../sidebar.json',
                dataType: 'json',

                success: function success(data) {
                    var sidebar = [];

                    var _loop = function _loop(i) {
                        var items = data[i].content;
                        var content = [];

                        items.forEach(function (item) {
                            var subtext = [];
                            var insideContent = void 0;

                            switch (i) {
                                case 0:
                                    item.subtext.forEach(function (element) {
                                        subtext.push(new SidebarLink(element.href, element.title));
                                    });

                                    insideContent = new SidebarDownLevel(subtext);
                                    break;
                                case 1:
                                    item.subtext.forEach(function (element) {
                                        var arrLink = [];

                                        element.content.forEach(function (el) {
                                            arrLink.push(new SidebarLink(el.href, el.title));
                                        });

                                        subtext.push({ month: element.month, count: element.count, content: new SidebarDownLevel(arrLink) });
                                    });

                                    insideContent = new SidebarUpLevel(subtext);
                                    break;
                            }

                            content.push({ count: item.count, text: item.text, insideContent: insideContent });
                        });

                        sidebar.push(new Sidebar(content));
                    };

                    for (var i = 0; i < data.length; i++) {
                        _loop(i);
                    }

                    var sidebarContainer = document.querySelectorAll('.sidebar_container');

                    for (var i = 0; i < sidebarContainer.length; i++) {
                        sidebarContainer[i].innerHTML = sidebar[i].render();
                    }
                },
                complete: function complete() {
                    self.open();
                }
            });
        }
    }, {
        key: 'open',
        value: function open() {
            var self = this;

            $(self.$categories).on('click', function () {
                $($(self.$categories).not(this).next()).slideUp('slow');
                $($(this).next()).slideToggle('slow');
            });

            $(self.$archive).on('click', function () {
                $($(self.$archive).not(this).next()).slideUp('slow');
                $($(this).next()).slideToggle('slow');
            });

            $(self.$insideContent).on('click', function () {
                $($(self.$insideContent).not(this).next()).slideUp('show');
                $($(this).next()).slideToggle('slow');
            });
        }
    }]);

    return SidebarControl;
}();