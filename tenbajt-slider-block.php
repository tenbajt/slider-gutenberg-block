<?php
/**
 * Plugin Name:       Slider Block
 * Plugin URI:        https://www.tenbajt.pl
 * Description:       Slider obrazków dla edytora Gutenberg.
 * Version:           1.0.0
 * Requires at least: 5.9.3
 * Requires PHP:      8.0.8
 * Author:            Tenbajt
 * Author URI:        https://www.tenbajt.pl
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tenbajt-slider-block
 * Domain Path:       /languages
 * Update URI:        https://www.tenbajt.pl/wordpress/plugins/slider-block
 * 
 * @package           create-block
 */

namespace Tenbajt\SliderBlock;

class SliderBlock
{
    /**
     * Initialize slider block plugin instance.
     * 
     * @return void
     * 
     * @see https://developer.wordpress.org/reference/hooks/init/
     * @see https://developer.wordpress.org/reference/hooks/block_categories_all/
     */
    public function __construct()
    {
        add_action('init', [$this, 'registerBlock']);
        add_action('init', [$this, 'registerFields']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
        //add_filter('block_categories_all', [$this, 'registerBlockCategory'], 10, 2);
    }

    /**
     * Register the block.
     * 
     * @return void
     * 
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    public function registerBlock(): void
    {
        register_block_type(__DIR__ . '/backend/build');
    }

    /**
     * Register meta fields.
     * 
     * @return void
     * 
     * @see https://developer.wordpress.org/reference/functions/register_post_meta/
     */
    public function registerFields(): void
    {
        register_post_meta('', 'tenbajt_slider_block', [
            'type' => 'object',
            'single' => true,
            'show_in_rest' => [
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'images' => [
                            'type' => 'object',
                            'properties' => [
                                'desktop' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'integer'],
                                            'url' => ['type' => 'string'],
                                            'alt' => ['type' => 'string']
                                        ]
                                    ]
                                ],
                                'mobile' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'id' => ['type' => 'integer'],
                                            'url' => ['type' => 'string'],
                                            'alt' => ['type' => 'string']
                                        ]
                                    ]
                                ]
                            ]
                        ],
                    ]
                ]
            ]
        ]);
    }

    /**
     * Enqueue block's scripts.
     * 
     * @return void
     * 
     * @see https://developer.wordpress.org/reference/functions/wp_enqueue_script/
     */
    public function enqueueScripts(): void
    {
        wp_enqueue_script(
            'wp-block-tenbajt-slider-block-slider',
            plugin_dir_url(__FILE__) . 'frontend/build/index.js',
            ['wp-element', 'wp-api-fetch', 'wp-polyfill', 'wp-primitives'],
            '1.0.0',
            true
        );
    }

    /**
     * Register block's category.
     * 
     * @param  array  $categories
     * @param  WP_Block_Editor_Context|string  $context
     * @return array
     * 
     * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#managing-block-categories
     */
    public function registerBlockCategory(array $categories, $context): array
    {
        $category = [
            'slug'  => 'tenbajt',
            'title' => 'Tenbajt',
            'icon'  => null,
        ];

        $slugs = array_column($categories, 'slug');

        if (! in_array($category['slug'], $slugs, true)) {
            array_push($categories, $category);
        }

        return $categories;
    }
}

return new SliderBlock();