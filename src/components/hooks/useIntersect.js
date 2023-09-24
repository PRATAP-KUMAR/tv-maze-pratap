import { useMemo, useEffect } from 'react';

function useIntersect(options) {
    const loadImage = (image) => {
        image.src = image.dataset.src;
    }

    const optionsMemo = useMemo(() => {
        return options
    }, [options])

    useEffect(() => {
        const callbackFunction = (entries, self) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage(entry.target)
                    self.unobserve(entry.target)
                }
            })
        }
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const images = document.querySelectorAll('[data-src]');

        images.forEach(image => {
            observer.observe(image);
        })
    }, [optionsMemo])
}

export default useIntersect;
