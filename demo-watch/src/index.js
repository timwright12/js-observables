import WatchJS from 'melanke-watchjs';

/**
 * State Object for this component
 */
let state = {
	loading: false,
	menuOpen: false
};

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( state, "loading", function() {

	loadingHelper( document.getElementById( 'load' ) );

} );

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( state, "menuOpen", function() {
	
	const button = document.getElementById( 'toggle' );
	
	if ( false === state.menuOpen ) {
		menuClose( button );
	} else {
		menuOpen( button );
	}

} );

/**
 * Fetch Data
 */
fetch('https://baconipsum.com/api/?type=meat-and-filler')
	.then( function( response ) {
		state.loading = true;
		return response.json();
	})
	.catch( function( error ) {
		console.log( error.message );
	} )
	.then( function( response ) {
		state.loading = false;
		document.getElementById( 'load' ).innerHTML = response;
	});

/**
 * Adding loading attrs to sync DOM elements
 */
function loadingHelper( el ) {

	if ( true === state.loading ) {
		el.setAttribute( 'aria-busy', 'true');
		el.setAttribute( 'aria-label', 'Loading Content, please wait.');
	} else {
		el.setAttribute( 'aria-busy', 'false');
		el.removeAttribute( 'aria-label' );
	}
	
}

/**
 * Menu click event
 */
document.getElementById( 'toggle' ).addEventListener( 'click', () => {

	if ( true === state.menuOpen ) {
		state.menuOpen = false;
	} else {
		state.menuOpen = true;
	}

});

/**
 * Open Menu
 */
function menuOpen( el ) {
	const controls = el.getAttribute( 'aria-controls' );
	const menu = document.getElementById( controls );
	
	menu.setAttribute( 'aria-hidden', 'false' );
	menu.querySelector( 'a' ).focus();
}

/**
 * Close Menu
 */
function menuClose( el ) {
	const controls = el.getAttribute( 'aria-controls' );
	const menu = document.getElementById( controls );
	
	menu.setAttribute( 'aria-hidden', 'true' );
	el.focus();
}
