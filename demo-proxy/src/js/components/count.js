import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Count extends Component {
	constructor() {
		super( {
			store,
			element: document.querySelector( '.js-count' )
		} );
	}
    
	/**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
	render() {
		let suffix = 1 !== store.state.items.length ? 's' : '';
		let emoji = 0 < store.state.items.length ? '🙌' : '😢';

		this.element.innerHTML = `
            <small>You've done</small>
            <span>${store.state.items.length}</span>
            <small>thing${suffix} today ${emoji}</small>
        `;
	}
}
