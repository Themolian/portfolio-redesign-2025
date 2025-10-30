<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Jamie_Curran_Portfolio
 */



$context = Timber::context();

$context['page_template'] = 'Homepage';

// Hero Fields

// Hero Left
$kickers = array();

if(have_rows('hero_kickers')) {
    while(have_rows('hero_kickers')) {
        the_row();

        $kicker = array();

        $kicker['text'] = get_sub_field('kicker_text');
        $kicker['lang'] = get_sub_field('kicker_language');

        array_push($kickers, $kicker);

    }
}

$context['hero_kickers'] = $kickers;
$context['hero_heading'] = get_field('hero_heading');
$context['hero_subheading'] = get_field('hero_subheading');
$context['hero_button'] = get_field('hero_button');

// Hero Right
$context['hero_profile'] = get_field('hero_profile');
$context['profile_labels'] = get_field('profile_labels');

// Components
$context['projects_listing'] = get_field('projects_listing');
$context['content_icon_headings'] = get_field('content_icon_headings');

// Socials
$context['socials'] = get_socials();

?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<div class="site-head">
		<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'portfolio' ); ?></a>

		<header id="masthead" class="site-header">
			<div class="header-inner">
				<div class="site-branding">
					<?php
					the_custom_logo();
					if ( is_front_page() && is_home() ) :
						?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php
					else :
						?>
						<?php
					endif;
					$portfolio_description = get_bloginfo( 'description', 'display' );
					if ( $portfolio_description || is_customize_preview() ) :
						?>
						<p class="site-description"><?php echo $portfolio_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
					<?php endif; ?>
				</div><!-- .site-branding -->
				<nav id="site-navigation" class="global-nav" data-component="nav-single" aria-label="Primary navigation">
					<!-- <button class="button button--ghost" data-trigger="mobile-nav" aria-expanded="true">
						<span class="visuallyhidden">Menu</span>
					</button> -->
					<?php
					wp_nav_menu(
						array(
							'menu' => '',
							'menu_class' => 'clean-list',
						)
					);
					?>
				</nav><!-- #site-navigation -->
			</div>
		</header><!-- #masthead -->
		<?php
			Timber::render('templates/hero.twig', $context);
		?>
	</div><!-- .site-head -->
