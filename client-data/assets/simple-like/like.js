jQuery( document ).ready( function () {

	// функция в которой отправляется AJAX запрос на сервер
	function set_like( $button ) {
		// получаем идентификатор поста (хранится в атрибуте кнопки)
		var post_id = $button.attr( 'data-like-id' );
		// создаём AJAX запрос на сервер
		jQuery.ajax( {
			type: 'GET',
			url: ThemeLiked.ajaxurl,
			data: {
				action: 'liked',
				security: ThemeLiked.liked,
				post_id: post_id,
				client_id: client_id,
			},
			// перед отправкой запроса добавляем класс для индикации загрузки
			beforeSend: function () {
				$button.addClass( 'loading' );
			},
			// действия в случае успешного запроса
			success: function ( answer ) {
				if ( answer.data.action == 'add' ) {
					liked[ liked.length ] = Number( post_id );
					$button.addClass( 'liked' );
				} else {
					liked.splice( liked.indexOf( Number( post_id ) ), 1 );
					$button.removeClass( 'liked' );
				}
				$button.attr( 'data-liked-count', answer.data.count );
			},
			error: function ( answer ) {
				console.log( answer );
			},
		// после обработки запроса убираем класс индикации загрузки
		} ).then( function () {
			window.localStorage.setItem( 'liked', JSON.stringify( liked ) );
			$button.removeClass( 'loading' );
		} );
	}

	// функция для формирования хеш-кода
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if ( this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ( (hash << 5 ) - hash ) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

	var date = new Date();
	var client_id = window.localStorage.getItem( 'client_id' );
	var liked;

	// если идентификатор клиента не задан, то формируем его
	if ( client_id == null ) {
		client_id = new String( navigator.userAgen + ' ' + date.toString() + ' ' ).hashCode();
		window.localStorage.setItem( 'client_id', client_id );
	}

	// получаем массив понравившихся постов
	if ( window.localStorage.getItem( 'liked' ) == null ) {
		liked = [];
		window.localStorage.setItem( 'liked', JSON.stringify( liked ) )
	} else {
		liked = JSON.parse( window.localStorage.getItem( 'liked' ) );
	}

	// устанавливаем статус "Понравился" выбранным кнопкам
	jQuery( '[data-like-id]' ).each( function ( index, button ) {
		var $button = jQuery( button );
		if ( liked.includes( Number( $button.attr( 'data-like-id' ) ) ) ) {
			$button.addClass( 'liked' );
			if ( $button.attr( 'data-liked-count' ).length == 0 || $button.attr( 'data-liked-count' ) == 0 ) {
				set_like( $button );
			}
		}
	} );

	// утановка событие на клик по кнопкам "Нравится"
	jQuery( 'body' ).on( 'click', '[data-like-id]:not( .loading )', function ( e ) {
		e.preventDefault();
		set_like( jQuery( this ) );    
	} );

} );