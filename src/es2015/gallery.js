
class Gallery {
    constructor() {
        this.galleryData = [];
        this.gallery = document.querySelector('.gallery');
        this.galleryMobile = 'gallery_mobile';
        this.galleryImage = document.querySelectorAll('.gallery_image');
        this.galleryTitle = document.querySelectorAll('.gallery_item_title');
        this.gallerySubtitle = document.querySelectorAll('.gallery_item_subtitle');
        this.galleryMouth = document.querySelectorAll('.gallery_item_mouth');
        this.galleryDay = document.querySelectorAll('.gallery_item_day');
        this.galleryLikeCount = document.querySelectorAll('.gallery_item_like_count');
        this.galleryCommentsCount = document.querySelectorAll('.gallery_item_comments_count');
        this.galleryBtn = document.querySelectorAll('.open_full_btn');
        this.commentsList = document.querySelector('.modal_comments');
        this.galleryUserComment = document.querySelector('#galleryUserComment');
        this.$gallerySendComment = '#gallerySendComment';
        this.$openModal = '.open_full_btn';
        this.$modalClose = '#modalFullClose, #modalOverlay';
        this.$modalOverlay = '#modalOverlay';
        this.$modalFullImage = '#modalFullImg';
        this.$modalGallery = '.modal_full_gallery';
        this.$galleryLike = '.gallery_item_like';
        this.$galleryLikeCount = '.gallery_item_like_count';
        this.$galleryComments = '.gallery_item_comments';
        this.$galleryCommentsCount = '.gallery_item_comments_count';
        this.$modalLike = '#modalLike';

        this.imgCount = null;
    }

    galleryRender() {
        $.ajax({
            context: this,
            url: './../gallery.json',
            type: 'get',
            dataType: 'json',

            success: function (data) {
                for (let i = 0; i < this.galleryImage.length; i++) {
                    this.galleryImage[i].setAttribute('src', data[i].srcImage);
                    this.galleryTitle[i].innerHTML = data[i].header.title;
                    this.gallerySubtitle[i].innerHTML = data[i].header.subtitle;
                    this.galleryMouth[i].innerHTML = data[i].header.month;
                    this.galleryDay[i].innerHTML = data[i].header.day;
                    this.galleryLikeCount[i].innerHTML = data[i].footer.likeCounter;
                    this.galleryCommentsCount[i].innerHTML = data[i].footer.commentsCounter;
                    this.galleryBtn[i].setAttribute('data-image', '' + i);

                    this.galleryData[i] = data[i];
                }
            }
        });
    }

    openPanel() {
        let self = this;

        $(self.$modalClose).on('click', function () {
            $(self.$modalGallery).hide('slow');
            $(self.$modalOverlay).css({'display': 'none'});
        });

        $(self.$openModal).on('click', function () {
            self.imgCount = $(this).data().image;

            $(self.$modalFullImage).attr('src', self.galleryData[$(this).data().image].srcImage);
            $(self.$modalOverlay).css({'display': 'block'});
            $(self.$modalGallery).show('slow');

            self.comments(parseInt($($(this).parent().prev().find(self.$galleryCommentsCount)).text()));
        });

        $(self.$modalLike).click(function () {
            $($(self.$galleryLike)[self.imgCount]).trigger('click');

            $(this).animate({fontSize: '110px'}, 'fast', 'linear', function () {
                $(this).animate({fontSize: '90px'}, 'fast', 'linear');
            }.bind(this));
        });

        $(self.$galleryComments).on('click', function () {
            $($($($(this).parent()).parent()).next()).find(self.$openModal).trigger('click');
        });

        $(self.$gallerySendComment).on('click', function (event) {
            event.preventDefault();
            self.addComment();
        });
    }

    likeInc() {
        let self = this;

        $(self.$galleryLike).on('click', function () {
            let $count = $($(this).find(self.$galleryLikeCount));
            let newValue = parseInt($count.text()) + 1;
            $($count).text(newValue);

            /* Примерный AJAX запрос на сервер, что бы изменить в БД количество лайков под картинкой
            $.ajax({
                type: 'GET'
                url: '...',
                data: 'value=' + newValue,
                dataType: 'boolean',

                success: function(data) {
                    if (data) {
                        $($count).text(newValue);
                    }
                });
            */
        });
    }

    comments(commentLimit) {
        $.ajax({
            context: this,
            type: 'get',
            url: 'http://jsonplaceholder.typicode.com/comments',
            dataType: 'json',

            success: function (data) {
                let randomPosts = Math.floor(Math.random() * 400);
                let limitPosts = randomPosts + commentLimit;
                let commentsList = '';

                for (let i = randomPosts; i < limitPosts; i++) {
                    commentsList += `<div class="modal_comments_item card"><div class="card-body">${data[i].body} ${i}</div></div>`;
                }

                this.commentsList.innerHTML = '';
                $(commentsList).appendTo(this.commentsList);
            }
        });
    }

    addComment() {
        let commentValue = this.galleryUserComment;
        if (commentValue.value) {
            let userComment = `<div class="modal_comments_item card"><div class="card-body">${commentValue.value}</div></div>`;
            let commentsCount = $($(this.$galleryCommentsCount)[this.imgCount]);

            $(userComment).appendTo(this.commentsList);
            commentValue.value = '';
            commentsCount.text(parseInt(commentsCount.text()) + 1);

            return true;
        }
    }

    mobileVersion() {
        if (document.documentElement.clientWidth <= 981) {
            this.gallery.classList.add(this.galleryMobile);
        }

        window.onresize = () => {
            if (document.documentElement.clientWidth <= 981) {
                this.gallery.classList.add(this.galleryMobile);
            } else {
                this.gallery.classList.remove(this.galleryMobile);
            }
        }
    }
}