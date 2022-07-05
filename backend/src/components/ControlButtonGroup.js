import { Fragment } from "@wordpress/element";

export default function ControlsButtonGroup(props) {

    return (
        <Fragment>
            <Button direction="prev" clickHandler={handleScroll}/>
            <Button direction="next" clickHandler={handleScroll}/>
        </Fragment>
    )
}