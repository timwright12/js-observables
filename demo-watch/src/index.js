import WatchJS from 'melanke-watchjs';

/**
 * State Object for this component
 */
let data = {
	menuOpen: false,
	menuToggle: document.getElementById( 'toggle' ),
	loading: false,
	loadingTarget: document.getElementById( 'load' )
};

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( data, "loading", () => { data.loading ? loadingYes( data.loadingTarget ) : loadingNo( data.loadingTarget ) } );

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( data, "menuOpen", () => { data.menuOpen ? menuOpen( data.menuToggle ) : menuClose( data.menuToggle ) } );

/**
 * Fetch Data
 */
fetch( 'https://baconipsum.com/api/?type=meat-and-filler' )
	.then( function( response ) {
		data.loading = true;
		return response.json();
	})
	.catch( function( error ) {
		console.log( error.message );
	} )
	.then( function( response ) {
		data.loading = false;
		data.loadingTarget.innerHTML = response;
	});

/**
 * Adding loading attrs to sync DOM elements
 */
function loadingYes( el ) {
	el.setAttribute( 'aria-busy', 'true');
	el.setAttribute( 'aria-label', 'Loading Content, please wait.');
}

/**
 * Removing loading attrs to sync DOM elements
 */
function loadingNo( el ) {
	el.setAttribute( 'aria-busy', 'false');
	el.removeAttribute( 'aria-label' );
}

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

/**
 * Menu click event
 */
data.menuToggle.addEventListener( 'click', () => {

	if ( true === data.menuOpen ) {
		data.menuOpen = false;
	} else {
		data.menuOpen = true;
	}

} );
