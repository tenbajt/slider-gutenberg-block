import styled, { css } from "styled-components";
import { useMediaQuery } from "@react-hook/media-query";
import { breakpoint, color, radius } from "../resources";
import { Button, Slide, Slides, ThemeProvider } from "../components";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";

export default function ScrollableImageList({ meta, error, isLoading }) {
    const slides = useRef([]);

    const type = useMediaQuery(breakpoint.sm.replace('@media ', '')) ? 'desktop' : 'mobile';
    const images = meta?.tenbajt_slider_block?.images?.[type];

    const canHover = useMediaQuery('(hover: hover)');
    const canScroll = images?.[type]?.length > 1;
    const [intervalId, setIntervalId] = useState(null);

    const stopAutoScroll = () => {
        clearInterval(intervalId)
    }

    const handleScroll = (event) => {
        if (event) {
            stopAutoScroll()
        }

        const currentSlide = slides.current.find(slide => (
            slide && (slide.offsetLeft === slide.offsetParent.scrollLeft)
        ));

        if (! currentSlide) return;

        let targetSlide;

        switch(event?.target.attributes.direction.value) {
            case 'prev':
                targetSlide = currentSlide.previousSibling ?? slides.current[slides.current.length - 1];
                break;
            default:
                targetSlide = currentSlide.nextSibling ?? slides.current[0];
                break;
        }

        targetSlide.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    useEffect(() => {
        if (canScroll) {
            setIntervalId(setInterval(handleScroll, 7000));
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [images, type]);

    return (
        <ThemeProvider>
            <div style={{ position: 'relative' }}>
                <Slides onWheel={stopAutoScroll} onTouchMove={stopAutoScroll}>
                    {images?.map((image, index) => (
                        <Slide key={image.id} image={image} index={index} slides={slides.current}/>
                    ))}
                </Slides>
                <Controls/>
                {(canHover && canScroll) &&
                    <Fragment>
                        <Button direction="prev" clickHandler={handleScroll}/>
                        <Button direction="next" clickHandler={handleScroll}/>
                    </Fragment>
                }
            </div>
        </ThemeProvider>
    )
}