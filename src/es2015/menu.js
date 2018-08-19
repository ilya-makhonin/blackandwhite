
class Menu {
    constructor() {
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

    menuRender() {
        let self = this;

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
}