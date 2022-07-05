import * as Styled from "./ControlButton.styles";
import { chevronLeft, chevronRight } from "@wordpress/icons";

export default function Button(props) {
    const chevron = {
        prev: chevronLeft,
        next: chevronRight
    }

    return (
        <Styled.Button direction={props.direction} onClick={props.clickHandler}>
            <Styled.Chevron icon={chevron[props.direction]}/>
        </Styled.Button>
    )
}