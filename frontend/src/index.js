import { Block } from "./components";

/**
 * Get the root element.
 * 
 * @param  DOMString  elementId
 * @return Element
 * 
 * @see https://developer.mozilla.org/pl/docs/Web/API/Document/getElementById
 */
const root = document.getElementById('wp-block-tenbajt-slider-block-slider');

/**
 * Render the block.
 * 
 * @param element
 * @param container
 * 
 * @see https://pl.reactjs.org/docs/react-dom.html#render
 */
wp.element.render(<Block postId={root.attributes.postid.value}/>, root);
