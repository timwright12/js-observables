import WatchJS from 'melanke-watchjs';

const init = () => {

	/**
	 * State Object for this component
	 */
	let data = {
		menuOpen: false,
		menuToggle: document.getElementById( 'toggle' )
	};
	
	/**
	 * Watch the state loading object for changes
	 */
	WatchJS.watch( data, "menuOpen", () => { data.menuOpen ? menuOpen( data.menuToggle ) : menuClose( data.menuToggle ) } );
	
	/**
	 * Menu click event
	 */
	data.menuToggle.addEventListener( 'click', () => { data.menuOpen ?  data.menuOpen = false : data.menuOpen = true } );
	
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

}

export default init;
