(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        shareMessageAndSubject: function () {
            this.share('The message', 'The subject', null, null);
        },

        shareMessageAndImage: function () {
            this.share('The message', 'The subject', 'http://www.telerik.com/sfimages/default-source/productsimages/mobilecraft/telerik-platform.png', null);
        },

        shareMessageAndURL: function () {
            this.share('The message', 'The subject', null, 'http://www.telerik.com');
        },
        
        share: function (message, subject, image, link) {
            if (!this.checkSimulator()) {
            	window.plugins.socialsharing.share(message, subject, image, link, this.onSuccess, this.onError);
            }
        },


        shareMessageAndURLViaTwitter: function () {
            if (!this.checkSimulator()) {
                window.plugins.socialsharing.shareViaTwitter('The message', null, 'http://www.telerik.com', this.onSuccess, this.onError);
            }
        },

        shareImagesViaFacebook: function () {
            if (!this.checkSimulator()) {
                // For the files param you can pass null, a single string or an array.
                window.plugins.socialsharing.shareViaFacebook('The message', ['www/styles/images/logo.png', 'http://www.telerik.com/sfimages/default-source/productsimages/mobilecraft/telerik-platform.png'], null, this.onSuccess, this.onError);
            }
        },

        shareMessageViaWhatsApp: function () {
            if (!this.checkSimulator()) {
 	           window.plugins.socialsharing.shareViaWhatsApp ('The message', null, null, this.onSuccess, this.onError);
            }
        },

        shareMessageViaSMS: function () {
            if (!this.checkSimulator()) {
 	           window.plugins.socialsharing.shareViaSMS ('The message', '+31612345678,+31623456789', this.onSuccess, this.onError);
            }
        },
        
        shareViaEmail: function () {
            if (!this.checkSimulator()) {
 	           window.plugins.socialsharing.shareViaEmail (
                   'The message',
                   'The subject',
                   ['to@person1.com', 'to@person2.com'], // TO: must be null or an array
                   ['cc@person1.com'], // CC: must be null or an array
                   null, // BCC: must be null or an array
                   ['https://www.google.nl/images/srpr/logo4w.png'],
                   this.onSuccess,
                   this.onError
               );
            }
        },

        checkSimulator: function() {
            if (window.plugins === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
                return true;
            }
            return false;
        },

        // callbacks
        onSuccess: function(msg) {
            console.log('SocialSharing success: ' + msg);
        },

        onError: function(msg) {
            alert('SocialSharing error: ' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);