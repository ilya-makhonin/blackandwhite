class RandomPost {
    constructor() {
        this.postImage = document.querySelectorAll('.random_post_image');
    }

    render() {
        $.ajax({
            context: this,
            type: 'get',
            url: './../random.json',
            dataType: 'json',

            success: function (data) {
                if (data.length) {
                    for (let i = 0; i < this.postImage.length; i++) {
                        this.postImage[i].setAttribute('src', data[i]);
                    }
                }
            }
        });
    }
}