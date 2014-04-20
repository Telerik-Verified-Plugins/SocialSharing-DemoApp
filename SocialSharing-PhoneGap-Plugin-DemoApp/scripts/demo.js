(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        // TODO impl SocialSharing
        
        
        // short lasting messages
        showToast_shortTop: function () {
            window.plugins.toast.showShortTop('Your changes have been saved', this.onSuccess, this.onError);
        },
        
        showToast_shortCenter: function () {
            window.plugins.toast.showShortCenter('There were validation errors', this.onSuccess, this.onError);
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