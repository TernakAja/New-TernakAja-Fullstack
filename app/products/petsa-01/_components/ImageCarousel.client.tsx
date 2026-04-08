"use client"

import { useState, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HERO_IMAGES = [
    "/products/petsa-01/1.png",
    "/products/petsa-01/2.png",
    "/products/petsa-01/3.png",
] as const

const HERO_IMAGE_COUNT = HERO_IMAGES.length

/**
 * ImageCarousel — isolated Client Component for the PETSA 01 hero image slideshow.
 *
 * Extracted from the parent page to keep petsa-01/page.tsx a Server Component.
 * All interactive state (currentImageIndex) lives exclusively here.
 */
export function ImageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGE_COUNT)
    }, [])

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGE_COUNT) % HERO_IMAGE_COUNT)
    }, [])

    // Precompute stable dot handlers — no inline lambdas in JSX
    const dotHandlers = useMemo(
        () => HERO_IMAGES.map((_, i) => () => setCurrentImageIndex(i)),
        []
    )

    return (
        <div className="group relative flex w-full max-w-xs items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg [contain:layout]">
            {/* Invisible spacer — keeps container height stable */}
            <img
                src={HERO_IMAGES[0]}
                className="invisible h-auto w-full object-contain pointer-events-none"
                aria-hidden="true"
                alt=""
            />

            {HERO_IMAGES.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`PETSA 01 View ${index + 1}`}
                    className={`absolute left-0 top-0 h-full w-full object-contain drop-shadow-2xl transition-all duration-700 ease-in-out [will-change:transform,opacity] ${
                        index === currentImageIndex
                            ? 'opacity-100 z-10 scale-50'
                            : 'opacity-0 z-0 scale-50 pointer-events-none'
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                />
            ))}

            <button
                onClick={prevImage}
                className="absolute -left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/60 dark:bg-[#171717]/60 text-gray-600 dark:text-white/70 backdrop-blur-md transition-colors hover:bg-gray-100 dark:hover:bg-white/20 hover:text-black dark:hover:text-white sm:-left-12"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={nextImage}
                className="absolute -right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/60 dark:bg-[#171717]/60 text-gray-600 dark:text-white/70 backdrop-blur-md transition-colors hover:bg-gray-100 dark:hover:bg-white/20 hover:text-black dark:hover:text-white sm:-right-12"
                aria-label="Next image"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                {HERO_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={dotHandlers[index]}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                                ? 'w-6 bg-black dark:bg-white'
                                : 'w-1.5 bg-black/20 dark:bg-white/30 hover:bg-black/40 dark:hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
