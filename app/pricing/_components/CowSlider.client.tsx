"use client"

import { SLIDER_MARKS } from '../_data/pricing-data'

interface CowSliderProps {
    sliderIndex: number
    sliderStyle: React.CSSProperties
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onMarkClick: (index: number) => void
}

export function CowSlider({ sliderIndex, sliderStyle, onChange, onMarkClick }: CowSliderProps) {
    const selectedCows = SLIDER_MARKS[sliderIndex]

    return (
        <div className="w-full max-w-4xl mb-16 relative px-4 hidden md:block z-10">
            <div className="relative w-full flex flex-col items-center">
                <div className="mb-6 bg-card border border-border px-4 py-1.5 rounded-full text-sm font-medium text-foreground shadow-lg">
                    {selectedCows === 1000 ? "1000+ Sapi" : `${selectedCows} Sapi`}
                </div>

                <input
                    type="range"
                    min="0"
                    max={SLIDER_MARKS.length - 1}
                    value={sliderIndex}
                    onChange={onChange}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white focus:outline-none"
                    style={sliderStyle}
                />

                <div className="flex justify-between w-full mt-4 text-[12px] text-gray-500 font-medium">
                    {SLIDER_MARKS.map((mark, i) => (
                        <span
                            key={i}
                            className={`cursor-pointer transition-colors ${
                                sliderIndex === i
                                    ? 'text-foreground'
                                    : 'hover:text-foreground/80'
                            }`}
                            onClick={() => onMarkClick(i)}
                        >
                            {mark === 1000 ? '1000+' : mark}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
