(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        shareMessageAndSubject: function () {
            this.share('The message', 'The subject', null, null);
        },

        shareImage: function () {
            this.share(null, null, 'http://www.telerik.com/sfimages/default-source/productsimages/mobilecraft/telerik-platform.png', null);
        },

        shareMessageAndURL: function () {
            this.share('The message', 'The subject', null, 'http://www.telerik.com');
        },
        
        share: function (message, subject, image, link) {
            if (!this.checkSimulator()) {
            	window.plugins.socialsharing.share(message, subject, image, link, this.onSuccess, this.onError);
            }
        },

        tweetSelfie: function () {
            // doesn't need to be a selfie of course, but that seems to be hot these days ;)
            if (!this.checkSimulator()) {
                navigator.camera.getPicture(
                  function(base64EncodedImg) {
                    // wrap in a timeout so the native view of SocialSharing doesn't collide with the one from the camera plugin
                    setTimeout(function() {
                      window.plugins.socialsharing.shareViaTwitter('I can\'t seem to do a presentation without tweeting a selfie. Sue me!', 'data:image/jpg;base64,'+base64EncodedImg, null, null, null);
                    }, 500);
                  },
                  function(msg) {
                    alert("Error: " + msg);
                  },
                  {
                    quality: 50,
                    targetWidth: 600,
                    targetHeight: 600,
                    encodingType: Camera.EncodingType.JPEG,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA
                  }
                );
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
              	// Note that the passed message won't be prefilled for Facebook (tip: use shareViaFacebookWithPasteMessageHint)
                window.plugins.socialsharing.shareViaFacebook('The message, not shown on Android. On iOS only when no Facebook app is installed.', ['www/styles/images/logo.png', 'http://www.telerik.com/sfimages/default-source/productsimages/mobilecraft/telerik-platform.png'], null, this.onSuccess, this.onError);
            }
        },

        shareMessageAndImageViaFacebook: function () {
            if (!this.checkSimulator()) {
                // For the files param you can pass null, a single string or an array.
                window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Wow, your clipboard is a mess! Do you copy-paste a lot sir?', 'www/styles/images/logo.png', null, null, this.onSuccess, this.onError);
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
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugins === undefined || window.plugins.socialsharing === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
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