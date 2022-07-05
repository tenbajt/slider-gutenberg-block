import { Icon } from "@wordpress/icons";
import styled, { css } from 'styled-components';
import { color, radius, shadow } from "../resources";

export const Button = styled.button`
    top: 50%;
    width: 2.5rem;
    color: inherit;
    margin: 0;
    border: none;
    height: 2.5rem;
    cursor: pointer;
    padding: 0;
    display: grid;
    position: absolute;
    font-size: 100%;
    box-shadow: ${shadow.base};
    transition: background-color 150ms, border-color 150ms, color 150ms;
    line-height: inherit;
    font-family: inherit;
    align-content: center;
    border-radius: ${radius.full};
    text-transform: none;
    justify-content: center;
    background-color: white;
    background-image: none;
    -webkit-appearance: none;
    &:hover{
        background-color: ${color.slate._50};
    }
    ${({ direction }) => direction === 'prev' && css`
        left: 1rem;
        transform: translate(-50%, -50%);
    `}
    ${({ direction }) => direction === 'next' && css`
        right: 1rem;
        transform: translate(50%, -50%);
    `}
`;

export const Chevron = styled(Icon)`
    pointer-events: none;
`;