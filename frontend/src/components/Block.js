import styled from "styled-components";
import { ScrollableImageList } from "../../../backend/src/components";
import { breakpoint } from "../../../backend/src/resources";

const { useEffect, useState } = wp.element;

const Container = styled.div`
    margin: 1rem auto;
    max-width: 1280px;
    ${breakpoint.xl} {
        padding: 0 2rem;
    }
`;

export default function Block(props) {
    const [meta, setMeta] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        wp.apiFetch({
            path: `/wp/v2/pages/${props.postId}`
        })
        .then(
            (post) => {
                setMeta(post?.meta);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                console.log(error.message);
            }
        );
    }, []);

    return (
        <Container>
            <ScrollableImageList meta={meta} isLoaded={isLoaded}/>
        </Container>
    )
}