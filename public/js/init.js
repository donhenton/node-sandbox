(function ($) {
    $(function () {

        $('.button-collapse').sideNav(
                {
                    menuWidth: 150, // Default is 240
                    edge: 'left', // Choose the horizontal origin
                    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
                }

        );


        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on click
            alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
            gutter: 0, // Spacing from edge
            belowOrigin: false // Displays dropdown below the button
        }
        );





    }); // end of document ready
})(jQuery); // end of jQuery name space