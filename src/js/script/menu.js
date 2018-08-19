'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
    function Menu() {
        _classCallCheck(this, Menu);

        this.$headerClickImg = '.header_menu .menu_click';
        this.$footerClickImg = '.footer_menu .menu_click';
        this.$headerDropleft = '.header_menu .dropleft';
        this.$footerDropleft = '.footer_menu .dropleft';
        this.$menuClick = '.menu_click';
        this.$wrapper = '.wrapper';
        this.menuHeaderIcon = 'img/menu/menu_header.png';
        this.menuFooterIcon = 'img/menu/menu_footer.png';
        this.$menuButton = '.btn_menu';
        this.menuActive = 'menu_click_active';
    }

    _createClass(Menu, [{
        key: 'menuRender',
        value: function menuRender() {
            var self = this;

            $(self.$headerClickImg).attr('src', self.menuHeaderIcon);
            $(self.$footerClickImg).attr('src', self.menuFooterIcon);

            $(self.$menuButton).on('click', function () {
                $($(this).find(self.$menuClick)).toggleClass(self.menuActive);
            });

            $(self.$wrapper).on('click', function () {
                if ($(self.$headerDropleft).hasClass('show')) {
                    $(self.$headerClickImg).removeClass(self.menuActive);
                }

                if ($(self.$footerDropleft).hasClass('show')) {
                    $(self.$footerClickImg).removeClass(self.menuActive);
                }
            });
        }
    }]);

    return Menu;
}();