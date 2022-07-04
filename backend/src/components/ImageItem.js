import styled from "styled-components";
import { breakpoint } from "../resources";

const Item = styled.li`
    overflow: hidden;
    position: relative;
    aspect-ratio: 19.5 / 9;
    border-radius: ${props => props.theme.borderRadius};
    scroll-snap-stop: always;
    scroll-snap-align: center;
    ${breakpoint.sm} {
        aspect-ratio: 24 / 5;
    }
`;

const Image = styled.img`
    inset: 0;
    width: 100%;
    height: 100% !important;
    position: absolute;
    object-fit: cover;
    background-color: ${props => !props.src ? color.slate._100 : ''};
`;

export default function ImageItem(props) {
    return (
        <Item ref={ref => { if (ref) props.slides[props.index] = ref}}>
            <Image src={props.image.url} alt={props.image.alt}/>
        </Item>
    )
}