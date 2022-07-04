import styled, { css } from "styled-components";
import { breakpoint, color, radius } from "../resources";

const List = styled.ul`
    margin: 0;
    padding: 0;
	display: grid;
    list-style: none;
    column-gap: 0.5rem;
	overflow-x: scroll;
	grid-auto-flow: column;
    scrollbar-width: 0px;
    scroll-behavior: smooth;
    scrollbar-color: transparent transparent;
    scroll-snap-type: x mandatory;
	grid-auto-columns: calc(100% - 1rem);
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    &:first-child {
        padding-left: 1rem;
    }
    &:last-child {
        padding-right: 1rem;
    }
    ${breakpoint.sm} {
        grid-auto-columns: 100%;
        &:first-child {
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }
    }
    ${breakpoint.xl} {
        border-radius: ${props => props.theme.borderRadius};
    }
    ${({ children }) => !children && css`
        margin: 0 1rem;
        border-radius: ${radius.xl};
        background-color: ${color.gray._100};
        ${breakpoint.sm} {
            margin: 0;
        }
    `}
`;

export default function ImageList(props) {
    const handleManualScroll = (event) => {
        if (!children) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Stop auto scrolling.
        clearInterval(intervalId);
    }

    return (
        <List onWheel={handleManualScroll} onTouchMove={handleManualScroll}>
            {children}
        </List>
    )
}