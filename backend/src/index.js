import { useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { useEntityProp } from "@wordpress/core-data";
import { useBlockProps } from "@wordpress/block-editor";
import { Block, Toolbar } from "./components";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType('tenbajt-slider-block/slider', {
	edit: ({ attributes, setAttributes }) => {
		const postType = useSelect((select) => select('core/editor').getCurrentPostType(), []);
		const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

		const handleMediaSelect = (media, key) => {
			setMeta({...meta, tenbajt_slider_block: {
				...meta.tenbajt_slider_block, images: {
					...images, [key]: media.map((image) => {
						return {
							id:  image.id,
							url: image.url,
							alt: image.alt
						}
					})
				}
			}})
		};

		useEffect(() => {
			if (! attributes.postid) {
				let postId = useSelect((select) => select('core/editor').getCurrentPostId(), []);
				setAttributes({ postid: postId });
			}
		}, []);

		return (
			<div {...useBlockProps()}>
				<Block meta={meta}/>
				<Toolbar meta={meta} mediaSelectHandler={handleMediaSelect}/>
			</div>
		);
	},
	save: ({ attributes }) => {
		const blockProps = useBlockProps.save({
			id: 'wp-block-tenbajt-slider-block-slider',
			postid: attributes.postid
		});

		return (
			<div {...blockProps}></div>
		);
	}
});
