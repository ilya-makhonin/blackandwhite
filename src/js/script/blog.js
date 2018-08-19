'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blog = function () {
    function Blog() {
        _classCallCheck(this, Blog);

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

    _createClass(Blog, [{
        key: 'render',
        value: function render() {
            $.ajax({
                context: this,
                type: 'get',
                url: './../post.json',
                dataType: 'json',

                success: function success(data) {
                    this.data = data;
                },
                complete: function complete() {
                    this.setData();
                }
            });
        }
    }, {
        key: 'setData',
        value: function setData() {
            for (var i = 0; i < this.data.length; i++) {
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
    }]);

    return Blog;
}();