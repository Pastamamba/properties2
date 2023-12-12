import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useSlideInFromLeft = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            gsap.fromTo(elementRef.current,
                { x: -500, opacity: 0 },
                { duration: 1, x: 0, opacity: 1, ease: "power3.out" }
            );
        }
    }, []);

    return elementRef;
};

export default useSlideInFromLeft;
