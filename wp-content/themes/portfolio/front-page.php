<?php 
    get_header('homepage');
    $context = Timber::context();

    $context['page_template'] = 'Homepage';
?>

<main class="main" id="site-content">
	<?php Timber::render('templates/index.twig', $context); ?>
</main>

<?php 
    get_footer();
?>