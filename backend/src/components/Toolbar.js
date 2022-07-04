import { desktop, mobile } from "@wordpress/icons";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { BlockControls, MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";

export default function Toolbar({ meta, handleMediaSelect }) {
    const mediaTypes = [
        { 
            key: 'desktop',
            icon: desktop,
        },
        { 
            key: 'mobile',
            icon: mobile,
        },
    ];

    return (
        <BlockControls>
            <ToolbarGroup>
                {mediaTypes.map((type) => (
                    <MediaUploadCheck key={type.key}>
                        <MediaUpload
                            value={meta.tenbajt_slider_block?.images?.[type.key]?.map((image) => image.id)}
                            gallery={true}
                            multiple={true}
                            onSelect={(media) => handleMediaSelect(media, type.key)}
                            allowedTypes={['image']}
                            render={({open}) => (
                                <ToolbarButton icon={type.icon} label="Wybierz obrazki" onClick={open}/>
                            )}
                        />
                    </MediaUploadCheck>
                ))}
            </ToolbarGroup>
        </BlockControls>
    )
}