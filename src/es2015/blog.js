class Blog {
    constructor() {
        this.data = [];
        this.title = document.querySelectorAll('.post_title');
        this.date = document.querySelectorAll('.post_date');
        this.categories = document.querySelectorAll('.post_categories');
        this.readTime = document.querySelectorAll('.post_read_time');
        this.postImage = document.querySelectorAll('.post_image');
        this.postImageSignature = document.querySelectorAll('.post_image_text');
        this.text = document.querySelectorAll('.post_text');
        this.subtext = document.querySelectorAll('.post_subtext');
        this.authorName = document.querySelectorAll('.post_author_name');
        this.authorImage = document.querySelectorAll('.post_author_image');
    }

    render() {
        $.ajax({
            context: this,
            type: 'get',
            url: './../post.json',
            dataType: 'json',

            success: function (data) {
                this.data = data;
            },
            complete: function () {
                this.setData();
            }
        });
    }

    setData() {
        for (let i = 0; i < this.data.length; i++) {
            this.title[i].innerHTML = this.data[i].header.title;
            this.date[i].innerHTML = this.data[i].header.date;
            this.categories[i].innerHTML = this.data[i].header.categories;
            this.readTime[i].innerHTML = this.data[i].header.readTime;
            this.postImage[i].setAttribute('src', this.data[i].content.image);
            this.postImageSignature[i].innerHTML = this.data[i].content.imageSignature;
            this.text[i].innerHTML = this.data[i].content.text;
            this.subtext[i].innerHTML = this.data[i].content.subtext;
            this.authorName[i].innerHTML = this.data[i].author.name;
            this.authorImage[i].setAttribute('src', this.data[i].author.image);
        }
    }
}