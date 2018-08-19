class ValidData {
    constructor() {
        this.userName = document.querySelector('#contact_name');
        this.userEmail = document.querySelector('#contact_email');
        this.userMessage = document.querySelector('#user_comments');
        this.subscribeEmail = document.querySelector('#subscribe_email');

        this.sendUserInfo = document.querySelector('#contact_send');
        this.sendSubscribeEmail = document.querySelector('#subscribe_send');

        this.$contactForm = $('.form_contact');
        this.$subscribeForm = $('.form_subscribe');

        this.valid = {
            name: /[A-Za-zа-яА-Я]{2,}/,
            email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/
        }
    }

    checking() {
        this.sendUserInfo.addEventListener('click', () => {

            if (!(this.valid.name.test(this.userName.value))) {
                event.preventDefault();
                this.userName.value = 'Incorrect Name!!!';
                this.infoPanel('4px', '126px', 'nameError', 'Bill Gates', this.$contactForm);
                setTimeout(() => {
                    this.userName.value = '';
                    $('#nameError').remove();
                }, 1500);
            }
            if (!(this.valid.email.test(this.userEmail.value))) {
                event.preventDefault();
                this.userEmail.value = 'Incorrect Email!!!';
                this.infoPanel('78px', '126px', 'emailError', 'my@mail.com', this.$contactForm);
                setTimeout(() => {
                    this.userEmail.value = '';
                    $('#emailError').remove();
                }, 1500);
            }

            if (this.valid.name.test(this.userName.value) && this.valid.email.test(this.userEmail.value)) {
                this.userName.value = '';
                this.userEmail.value = '';
            }
        });

        this.sendSubscribeEmail.addEventListener('click', () => {

            if (!(this.valid.email.test(this.subscribeEmail.value))) {
                event.preventDefault();
                this.subscribeEmail.value = 'Incorrect Email!!!';
                this.infoPanel('10px', '160px', 'subscribeError', 'my@mail.com', this.$subscribeForm);
                setTimeout(() => {
                    this.subscribeEmail.value = '';
                    $('#subscribeError').remove();
                }, 1500);
            } else {
                this.subscribeEmail.value = '';
            }
        });
    }

    infoPanel(top, left, id, message, position) {
        $($('<div class="infoPanel" />').css({
            top: top,
            left: left
        })
            .attr('id', id)
            .text(message)).appendTo(position);
    }
}