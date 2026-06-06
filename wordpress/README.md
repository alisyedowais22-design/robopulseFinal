# RoboPulse WordPress Backend Setup

This folder contains the WordPress plugin required by the React frontend.

## Install

1. Copy the whole `wordpress` folder into your WordPress plugins directory as:
   `wp-content/plugins/robopulse-wp-integration/`
2. In WordPress Admin, activate **RoboPulse WordPress Integration**.
3. Go to **Tools → RoboPulse Import**.
4. Click **Import RoboPulse Seed Data**.

The importer preserves the existing React content and copies it into WordPress as editable content.

## API Endpoints

- Robots: `/wp-json/wp/v2/humanoids?per_page=100&_embed`
- Reviews: `/wp-json/wp/v2/reviews?per_page=100&_embed`
- Guides: `/wp-json/wp/v2/guides?per_page=100&_embed`
- News/Posts: `/wp-json/wp/v2/posts?per_page=100&_embed`

## React .env

Set your WordPress URL in the React project:

```env
VITE_WP_API_URL=https://your-wordpress-domain.com/wp-json
VITE_ENABLE_WORDPRESS=true
VITE_USE_MOCK=false
```

During local development without WordPress, the site automatically falls back to the existing local content.
