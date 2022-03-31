<?php


function get_like_button( $post_id = false ) {
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}
	$count = count( get_post_meta( $post_id, '_liked', false ) );
	return sprintf(
		'<button class="like" data-like-id="%1$s" data-liked-count="%2$s"><span class="sr-only">%3$s</span></button>',
		$post_id,
		( empty( $count ) ) ? '' : esc_attr( $count ),
		__( 'Поставить лайк', THEME_TEXTDOMAIN )
	);
}



function like_processing() {
	// проверяем код безопасности
	if ( isset( $_GET[ 'security' ] ) && wp_verify_nonce( $_GET[ 'security' ], 'liked' ) ) {
		// проверяем есть ли идентификатор поста и пользователя, без этих параметров можно дальше не продолжать
		if ( isset( $_GET[ 'post_id' ] ) && ! empty( $_GET[ 'client_id' ] ) && ! empty( $_GET[ 'client_id' ] ) ) {
			// очищаем идентификатор поста
			$post_id = sanitize_key( $_GET[ 'post_id' ] );
			// очищаем идентификатор пользователя
			$client_id = sanitize_text_field( $_GET[ 'client_id' ] );
			// получаем массив лайком для текущего поста
			$liked = get_post_meta(  $post_id, '_liked', false );
			// инициализируем переменную для ответа браузеру пользователя
			$action = '';
			// провверяем ставил ли уже пользователь лайк текущему посту
			if ( in_array( $client_id, $liked ) ) {
				// усли ставил, то удаляем лайк, и присваиваем соответствующий ответ для переменной $action
				delete_post_meta( $post_id, '_liked', $client_id );
				$action = 'delete';
			} else {
				// добавляем новый лайт и ответ в переменной $action
				add_post_meta( sanitize_key( $_GET[ 'post_id' ] ), '_liked', $client_id, false );
				$action = 'add';
			}
			// формируем ответ браузеру пользователя
			// будет передано количество поставленных лайков и информация
			// о выполненном на сервере действии (добавили или удалили)
			wp_send_json_success( array(
				'action' => $action,
				'count'  => count( get_post_meta(  $post_id, '_liked', false ) ),
			) );
		}
	}
	// обравыем работу скрипта
	wp_die();
}
// цепляем хуки, action в нашем случае равен 'liked'
add_action( 'wp_ajax_liked', 'like_processing' );
add_action( 'wp_ajax_nopriv_liked', 'like_processing' );



function liked_scripts() {
	wp_enqueue_script( 'liked', THEME_URL . 'scripts/liked.js', array( 'jquery' ), THEME_VERSION, true );
	wp_localize_script( 'liked', 'ThemeLiked', array(
		'ajaxurl'  => admin_url( 'admin-ajax.php' ),
		'liked'    => wp_create_nonce( 'liked' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'liked_scripts' );