window.dashExtensions = Object.assign({}, window.dashExtensions, {
    default: {
        function0: function(event) {
            console.log('Page loaded!');
            alert('Welcome to the Dash App!');
        }

    }
});