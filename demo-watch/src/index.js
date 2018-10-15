import WatchJS from 'melanke-watchjs';

/**
 * State Object for this component
 */
let componentData = {
	menuOpen: false,
	menuToggle: document.getElementById( 'toggle' ),
	loading: false,
	loadingTarget: document.getElementById( 'load' )
};

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( componentData, "loading", () => {

	loadingHelper( document.getElementById( 'load' ) );

} );

/**
 * Watch the state loading object for changes
 */
WatchJS.watch( componentData, "menuOpen", () => {

	if ( false === componentData.menuOpen ) {
		menuClose( componentData.menuToggle );
	} else {
		menuOpen( componentData.menuToggle );
	}

} );

/**
 * Fetch Data
 */
fetch( 'https://baconipsum.com/api/?type=meat-and-filler' )
	.then( function( response ) {
		componentData.loading = true;
		return response.json();
	})
	.catch( function( error ) {
		console.log( error.message );
	} )
	.then( function( response ) {
		componentData.loading = false;
		componentData.loadingTarget.innerHTML = response;
	});

/**
 * Adding loading attrs to sync DOM elements
 */
function loadingHelper( el ) {

	if ( true === componentData.loading ) {
		el.setAttribute( 'aria-busy', 'true');
		el.setAttribute( 'aria-label', 'Loading Content, please wait.');
	} else {
		el.setAttribute( 'aria-busy', 'false');
		el.removeAttribute( 'aria-label' );
	}
	
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
componentData.menuToggle.addEventListener( 'click', () => {

	if ( true === componentData.menuOpen ) {
		componentData.menuOpen = false;
	} else {
		componentData.menuOpen = true;
	}

} );
