<?php
/**
 * Adds field to devgeniem/acf-codifier
 * https://github.com/devgeniem/acf-codifier
 */

namespace Geniem\ACF\Field;

// If ACF-codifier has been installed and activated add field to codifier with name SmartLink.
if ( class_exists( 'Geniem\ACF\Field' ) ) {

    /**
     * Class SmartLink
     */
    class SmartLink extends \Geniem\ACF\Field {

        /**
         * Field type.
         *
         * @var string color_picker
         */
        protected $type = 'smart_button';

        /**
         * What post types to display
         *
         * @var array
         */
        protected $post_type;

        /**
         * Field constructor.
         *
         * @param [type] $inheritee
         */
        public function __construct( $inheritee = null ) {

        }

        /**
         * Set post types to show
         *
         * @throws \Geniem\ACF\Exception Throws error if $post_types is not valid.
         * @param array $post_types An array of post type names.
         * @return self
         */
        public function set_post_types( array $post_types ) {
            if ( ! is_array( $post_types ) ) {
                throw new \Geniem\ACF\Exception( 'Geniem\ACF\Group: set_post_types() requires an array as an argument' );
            }

            $this->post_type = $post_types;

            return $this;
        }

        /**
         * Add a post type to allowed post types
         *
         * @param string $post_type Post type to add.
         * @return self
         */
        public function add_post_type( string $post_type ) {
            $this->post_type[] = $post_type;

            $this->post_type = array_unique( $this->post_type );

            return $this;
        }

        /**
         * Remove post type by name from allowed
         *
         * @param  string $post_type Post type name.
         * @return self
         */
        public function remove_post_type( string $post_type ) {
            $position = array_search( $post_type, $this->post_type );

            if ( ( $position !== false ) ) {
                unset( $this->post_type[ $position ] );
            }

            return $this;
        }

        /**
         * Get allowed post types
         *
         * @return array
         */
        public function get_post_types() {
            return $this->post_type;
        }

    }
} // If ends.
