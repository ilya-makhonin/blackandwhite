'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidData = function () {
    function ValidData() {
        _classCallCheck(this, ValidData);

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
        };
    }

    _createClass(ValidData, [{
        key: 'checking',
        value: function checking() {
            var _this = this;

            this.sendUserInfo.addEventListener('click', function () {

                if (!_this.valid.name.test(_this.userName.value)) {
                    event.preventDefault();
                    _this.userName.value = 'Incorrect Name!!!';
                    _this.infoPanel('4px', '126px', 'nameError', 'Bill Gates', _this.$contactForm);
                    setTimeout(function () {
                        _this.userName.value = '';
                        $('#nameError').remove();
                    }, 1500);
                }
                if (!_this.valid.email.test(_this.userEmail.value)) {
                    event.preventDefault();
                    _this.userEmail.value = 'Incorrect Email!!!';
                    _this.infoPanel('78px', '126px', 'emailError', 'my@mail.com', _this.$contactForm);
                    setTimeout(function () {
                        _this.userEmail.value = '';
                        $('#emailError').remove();
                    }, 1500);
                }

                if (_this.valid.name.test(_this.userName.value) && _this.valid.email.test(_this.userEmail.value)) {
                    _this.userName.value = '';
                    _this.userEmail.value = '';
                }
            });

            this.sendSubscribeEmail.addEventListener('click', function () {

                if (!_this.valid.email.test(_this.subscribeEmail.value)) {
                    event.preventDefault();
                    _this.subscribeEmail.value = 'Incorrect Email!!!';
                    _this.infoPanel('10px', '160px', 'subscribeError', 'my@mail.com', _this.$subscribeForm);
                    setTimeout(function () {
                        _this.subscribeEmail.value = '';
                        $('#subscribeError').remove();
                    }, 1500);
                } else {
                    _this.subscribeEmail.value = '';
                }
            });
        }
    }, {
        key: 'infoPanel',
        value: function infoPanel(top, left, id, message, position) {
            $($('<div class="infoPanel" />').css({
                top: top,
                left: left
            }).attr('id', id).text(message)).appendTo(position);
        }
    }]);

    return ValidData;
}();