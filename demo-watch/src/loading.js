import WatchJS from 'melanke-watchjs';

const init = () => {
	
	const watch = WatchJS.watch;
	
	/**
	 * State Object for this component
	 */
	let data = {
		loading: false,
		loadingTarget: document.getElementById( 'load' )
	};
	
	/**
	 * Watch the state loading object for changes
	 */
	watch( data, "loading", () => { data.loading ? loadingYes( data.loadingTarget ) : loadingNo( data.loadingTarget ) } );
	
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

}

export default init;
