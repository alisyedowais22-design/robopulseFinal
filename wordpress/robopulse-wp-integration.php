<?php
/**
 * Plugin Name: RoboPulse WordPress Integration
 * Description: Registers RoboPulse robots, reviews and guides for the React frontend. Includes an importer that preserves the existing frontend content exactly.
 * Version: 1.0.0
 * Author: RoboPulse
 */

if (!defined('ABSPATH')) {
    exit;
}

class RoboPulse_WP_Integration {
    const OPTION_IMPORTED = 'robopulse_seed_imported_v1';

    private array $robot_meta = [
        'originalId', 'name', 'maker', 'country', 'countryCode', 'price', 'priceNum',
        'availability', 'availClass', 'score', 'dof', 'height', 'weight', 'speed',
        'battery', 'ai', 'hand', 'deploy', 'payload', 'tags', 'scoreBreakdown',
        'verdict', 'pros', 'cons', 'excerpt'
    ];

    private array $review_meta = [
        'originalId', 'robotId', 'robotName', 'score', 'readTime', 'displayDate',
        'authorName', 'authorTitle', 'excerpt', 'pros', 'cons', 'verdict', 'tags', 'featured'
    ];

    private array $guide_meta = [
        'originalId', 'guideType', 'description', 'readTime', 'tags'
    ];

    public function __construct() {
        add_action('init', [$this, 'register_post_types']);
        add_action('init', [$this, 'register_meta_fields']);
        add_action('admin_menu', [$this, 'admin_menu']);
        add_action('admin_post_robopulse_import_seed', [$this, 'import_seed']);
        add_filter('rest_prepare_humanoid', [$this, 'attach_acf_object'], 10, 3);
        add_filter('rest_prepare_robopulse_review', [$this, 'attach_acf_object'], 10, 3);
        add_filter('rest_prepare_robopulse_guide', [$this, 'attach_acf_object'], 10, 3);
        add_filter('rest_prepare_post', [$this, 'attach_acf_object'], 10, 3);
    }

    public function register_post_types(): void {
        register_post_type('humanoid', [
            'labels' => [
                'name' => 'Robots',
                'singular_name' => 'Robot',
                'add_new_item' => 'Add New Robot',
                'edit_item' => 'Edit Robot',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-superhero',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'humanoids',
            'has_archive' => true,
            'rewrite' => ['slug' => 'robots'],
        ]);

        register_post_type('robopulse_review', [
            'labels' => [
                'name' => 'Reviews',
                'singular_name' => 'Review',
                'add_new_item' => 'Add New Review',
                'edit_item' => 'Edit Review',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-star-filled',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'reviews',
            'has_archive' => true,
            'rewrite' => ['slug' => 'reviews'],
        ]);

        register_post_type('robopulse_guide', [
            'labels' => [
                'name' => 'Guides',
                'singular_name' => 'Guide',
                'add_new_item' => 'Add New Guide',
                'edit_item' => 'Edit Guide',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-welcome-learn-more',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'guides',
            'has_archive' => true,
            'rewrite' => ['slug' => 'guides'],
        ]);
    }

    public function register_meta_fields(): void {
        $this->register_group('humanoid', $this->robot_meta);
        $this->register_group('robopulse_review', $this->review_meta);
        $this->register_group('robopulse_guide', $this->guide_meta);
        $this->register_group('post', ['originalId', 'newsCategory', 'categoryColor', 'displayDate', 'readTime', 'source', 'excerpt']);
    }

    private function register_group(string $post_type, array $keys): void {
        foreach ($keys as $key) {
            register_post_meta($post_type, $key, [
                'single' => true,
                'type' => 'string',
                'show_in_rest' => true,
                'auth_callback' => function () {
                    return current_user_can('edit_posts');
                },
            ]);
        }
    }

    public function attach_acf_object($response, $post, $request) {
        $post_type = get_post_type($post);
        $keys = [];
        if ($post_type === 'humanoid') $keys = $this->robot_meta;
        if ($post_type === 'robopulse_review') $keys = $this->review_meta;
        if ($post_type === 'robopulse_guide') $keys = $this->guide_meta;
        if ($post_type === 'post') $keys = ['originalId', 'newsCategory', 'categoryColor', 'displayDate', 'readTime', 'source', 'excerpt'];

        $acf = [];
        foreach ($keys as $key) {
            $value = get_post_meta($post->ID, $key, true);
            if ($this->is_json($value)) {
                $value = json_decode($value, true);
            }
            $acf[$key] = $value;
        }
        $response->data['acf'] = $acf;
        return $response;
    }

    private function is_json($value): bool {
        if (!is_string($value) || $value === '') return false;
        json_decode($value);
        return json_last_error() === JSON_ERROR_NONE && in_array(substr(trim($value), 0, 1), ['[', '{'], true);
    }

    public function admin_menu(): void {
        add_management_page('RoboPulse Import', 'RoboPulse Import', 'manage_options', 'robopulse-import', [$this, 'import_page']);
    }

    public function import_page(): void {
        if (!current_user_can('manage_options')) return;
        $url = admin_url('admin-post.php');
        ?>
        <div class="wrap">
            <h1>RoboPulse Import</h1>
            <p>This imports the current React demo content into WordPress without rewriting the content.</p>
            <form method="post" action="<?php echo esc_url($url); ?>">
                <?php wp_nonce_field('robopulse_import_seed'); ?>
                <input type="hidden" name="action" value="robopulse_import_seed" />
                <?php submit_button('Import RoboPulse Seed Data'); ?>
            </form>
        </div>
        <?php
    }

    public function import_seed(): void {
        if (!current_user_can('manage_options')) wp_die('Unauthorized');
        check_admin_referer('robopulse_import_seed');

        $file = plugin_dir_path(__FILE__) . 'robopulse-seed-data.json';
        if (!file_exists($file)) wp_die('Seed file not found.');

        $data = json_decode(file_get_contents($file), true);
        if (!$data) wp_die('Invalid seed file.');

        foreach (($data['robots'] ?? []) as $robot) {
            $this->upsert_robot($robot);
        }
        foreach (($data['reviews'] ?? []) as $review) {
            $this->upsert_review($review);
        }
        foreach (($data['news'] ?? []) as $news) {
            $this->upsert_news($news);
        }
        foreach (($data['guides'] ?? []) as $guide) {
            $this->upsert_guide($guide);
        }

        update_option(self::OPTION_IMPORTED, current_time('mysql'));
        wp_safe_redirect(admin_url('tools.php?page=robopulse-import&imported=1'));
        exit;
    }

    private function find_by_original_id(string $post_type, string $original_id): int {
        $posts = get_posts([
            'post_type' => $post_type,
            'post_status' => 'any',
            'numberposts' => 1,
            'meta_key' => 'originalId',
            'meta_value' => $original_id,
            'fields' => 'ids',
        ]);
        return $posts ? (int) $posts[0] : 0;
    }

    private function upsert_post(string $post_type, string $original_id, string $title, string $content = '', string $excerpt = ''): int {
        $existing = $this->find_by_original_id($post_type, $original_id);
        $postarr = [
            'ID' => $existing,
            'post_type' => $post_type,
            'post_status' => 'publish',
            'post_title' => $title,
            'post_content' => $content,
            'post_excerpt' => $excerpt,
        ];
        return $existing ? wp_update_post($postarr) : wp_insert_post($postarr);
    }

    private function save_meta(int $post_id, array $values, array $map): void {
        foreach ($map as $meta_key => $source_key) {
            if (!array_key_exists($source_key, $values)) continue;
            $value = $values[$source_key];
            if (is_array($value) || is_object($value)) {
                $value = wp_json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
            update_post_meta($post_id, $meta_key, $value);
        }
    }

    private function upsert_robot(array $robot): void {
        $id = $this->upsert_post('humanoid', $robot['id'], $robot['name'], $robot['verdict'] ?? '', $robot['excerpt'] ?? '');
        update_post_meta($id, 'originalId', $robot['id']);
        $this->save_meta($id, $robot, [
            'name' => 'name', 'maker' => 'maker', 'country' => 'country', 'countryCode' => 'countryCode',
            'price' => 'price', 'priceNum' => 'priceNum', 'availability' => 'availability', 'availClass' => 'availClass',
            'score' => 'score', 'dof' => 'dof', 'height' => 'height', 'weight' => 'weight', 'speed' => 'speed',
            'battery' => 'battery', 'ai' => 'ai', 'hand' => 'hand', 'deploy' => 'deploy', 'payload' => 'payload',
            'tags' => 'tags', 'scoreBreakdown' => 'scoreBreakdown', 'verdict' => 'verdict', 'pros' => 'pros',
            'cons' => 'cons', 'excerpt' => 'excerpt'
        ]);
    }

    private function upsert_review(array $review): void {
        $id = $this->upsert_post('robopulse_review', $review['id'], $review['robotName'] ?? $review['id'], $review['verdict'] ?? '', $review['excerpt'] ?? '');
        update_post_meta($id, 'originalId', $review['id']);
        $this->save_meta($id, $review, [
            'robotId' => 'robotId', 'robotName' => 'robotName', 'score' => 'score', 'readTime' => 'readTime',
            'displayDate' => 'date', 'authorName' => 'author', 'authorTitle' => 'authorTitle', 'excerpt' => 'excerpt',
            'pros' => 'pros', 'cons' => 'cons', 'verdict' => 'verdict', 'tags' => 'tags', 'featured' => 'featured'
        ]);
    }

    private function upsert_news(array $news): void {
        $id = $this->upsert_post('post', $news['id'], $news['title'], $news['excerpt'] ?? '', $news['excerpt'] ?? '');
        update_post_meta($id, 'originalId', $news['id']);
        update_post_meta($id, 'newsCategory', $news['category'] ?? 'News');
        update_post_meta($id, 'categoryColor', $news['categoryColor'] ?? 'teal');
        update_post_meta($id, 'displayDate', $news['date'] ?? '');
        update_post_meta($id, 'readTime', $news['readTime'] ?? '');
        update_post_meta($id, 'source', $news['source'] ?? 'RoboPulse Staff');
        update_post_meta($id, 'excerpt', $news['excerpt'] ?? '');
    }

    private function upsert_guide(array $guide): void {
        $id = $this->upsert_post('robopulse_guide', $guide['id'], $guide['title'], $guide['description'] ?? '', $guide['description'] ?? '');
        update_post_meta($id, 'originalId', $guide['id']);
        update_post_meta($id, 'guideType', $guide['type'] ?? 'buyers');
        update_post_meta($id, 'description', $guide['description'] ?? '');
        update_post_meta($id, 'readTime', $guide['readTime'] ?? '');
        update_post_meta($id, 'tags', wp_json_encode($guide['tags'] ?? []));
    }
}

new RoboPulse_WP_Integration();
