class Sidebar {
    constructor(items) {
        this.items = items;
    }

    render() {
        let sidebar = ``;

        if (this.items) {
            this.items.forEach(item => {
                sidebar += `<div class="sidebar_tab">${item.text} (<span class="sidebar_count">${item.count}</span>)</div>`;
                sidebar += `<div class="sidebar_content">${item.insideContent.render()}</div>`;
            });
        }

        return sidebar;
    }
}

class SidebarUpLevel {
    constructor(items) {
        this.items = items;
    }

    render() {
        let categoriesContainer = ``;

        if (this.items) {
            this.items.forEach(item => {
                categoriesContainer += `<div class="sidebar_inside_tab">${item.month} (<span class="sidebar_inside_count">${item.count}</span>)</div>`;
                categoriesContainer += `<div class="sidebar_inside_content">${item.content.render()}</div>`;
            })
        }

        return categoriesContainer;
    }
}

class SidebarDownLevel {
    constructor(items) {
        this.items = items;
    }

    render() {
        let linkContainer = `<div class="sidebar_link_container">`;

        if (this.items) {
            this.items.forEach(item => {
                linkContainer += item.render();
            });
        }

        linkContainer += `</div>`;
        return linkContainer;
    }
}

class SidebarLink {
    constructor(href, title) {
        this.title = title;
        this.href = href;
    }

    render() {
        return `<a class="sidebar_link" href="${this.href}" target="_blank">${this.title}</a>`;
    }
}

class SidebarControl {
    constructor() {
        this.$categories = '.sidebar_categories .sidebar_tab';
        this.$archive = '.sidebar_archive .sidebar_tab';
        this.$insideContent = '.sidebar_content .sidebar_inside_tab';
    }

    render() {
        const self = this;

        $.ajax({
            type: 'get',
            url: './../sidebar.json',
            dataType: 'json',

            success: function (data) {
                let sidebar =[];

                for (let i = 0; i < data.length; i++) {
                    let items = data[i].content;
                    let content = [];

                    items.forEach(item => {
                        let subtext = [];
                        let insideContent;

                        switch (i) {
                            case 0:
                                item.subtext.forEach(element => {
                                    subtext.push(new SidebarLink(element.href, element.title));
                                });

                                insideContent = new SidebarDownLevel(subtext);
                                break;
                            case 1:
                                item.subtext.forEach(element => {
                                    let arrLink = [];

                                    element.content.forEach(el => {
                                        arrLink.push(new SidebarLink(el.href, el.title));
                                    });

                                    subtext.push({month: element.month, count: element.count, content: new SidebarDownLevel(arrLink)});
                                });

                                insideContent = new SidebarUpLevel(subtext);
                                break;
                        }

                        content.push({count: item.count, text: item.text, insideContent: insideContent});
                    });

                    sidebar.push(new Sidebar(content));
                }

                let sidebarContainer = document.querySelectorAll('.sidebar_container');

                for (let i = 0; i < sidebarContainer.length; i++) {
                    sidebarContainer[i].innerHTML = sidebar[i].render();
                }
            },
            complete: function () {
                self.open();
            }
        });
    }

    open() {
        const self = this;

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
        })
    }
}