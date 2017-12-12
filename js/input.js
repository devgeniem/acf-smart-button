/* jQuery( document ).ready( function( $ ) { */
(function($){

    function initialize_field( el ) {

        // Define vars
        /* var checkbox = el.find( '.button-link-switch-checkbox' ); */

        // Radio button for internal external selection.
        var radioSmartLink = el.find( '#select-internal-external input' );
        var internal = el.find( '.internal' );
        var external = el.find( '.external' );
        var switcherInput = el.find( '.switcher input' );
        var switcherLabel = el.find( '.switcher label' );

        console.log( 'test' );

        // trigger change function on init to respect current state (do not trigger change event as this provokes browser alert on window close)
        helperCheckboxChange( radioSmartLink, internal, external );

        // Listen to checkbox change
        radioSmartLink.change( function() {
            helperCheckboxChange( this, internal, external );
        });

        // sync id and for, for the label to work
        switcherLabel.attr( 'for', switcherInput.attr( 'id' ) );

    }

    /**
     * Helper radio button change.
     */
    function helperCheckboxChange( _self, internal, external ) {

        console.log( $( _self ).val() );

        /* if ( $( _self ).is( ':checked' ) ) { */
        if ( $( _self ).val() === 'external' ) {

            internal.hide();
            external.show();
            external.find( 'input' ).show();

        } else {
            internal.show();
            external.hide();
        }
    }

    if ( typeof acf.add_action !== 'undefined' ) {

        /**
         *  ready append (ACF5)
         *
         *  These are 2 events which are fired during the page load
         *  ready = on page load similar to $(document).ready()
         *  append = on new DOM elements appended via repeater field
         *
         *  @type	event
         *  @date	20/07/13
         *
         *  @param	el (jQuery selection) the jQuery element which contains the ACF fields
         *  @return	n/a
         */

        acf.add_action( 'ready append', function( el ) {

            // search el for fields of type 'button'
            acf.get_fields( { type: 'smart_button'}, el ).each( function() {

                initialize_field( $( this ) );

            });

        });

    } else {


        /**
         *  acf/setup_fields (ACF4)
         *
         *  This event is triggered when ACF adds any new elements to the DOM.
         *
         *  @type	function
         *  @since	1.0.0
         *  @date	01/01/12
         *
         *  @param	event		e: an event object. This can be ignored
         *  @param	Element		postbox: An element which contains the new HTML
         *
         *  @return	n/a
         */

        $( document ).on( 'acf/setup_fields', function( e, postbox ) {

            $( postbox ).find( '.field[data-field_type="smart_button"]' ).each( function() {
                initialize_field( $( this ) );
            });
        });


    }


})( jQuery );
/* }); */
