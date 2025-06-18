'use client'

import React, { useState, useEffect, useRef } from 'react'
import { assets } from "@/assets/assets"
import Image from 'next/image'

const sliderData = [
    {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: assets.header_headphone_image,
    },
    {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    offer: "Hurry up only few lefts!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: assets.header_playstation_image,
    },
    {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: assets.header_macbook_image,
    },
];

function HeaderSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement | null>(null)

    // ✅ auto slide
    useEffect(() => {
        if (isDragging) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderData.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [sliderData.length, isDragging])

    // manual change
    const handleSlideChange = (index: number) => {
        setCurrentSlide(index)
    }

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        const x = e.clientX
        const diff = x - startX
        setTranslateX(diff)
    }

    const handleMouseUp = () => {
        finishDrag()
    }

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const x = e.touches[0].clientX
        const diff = x - startX
        setTranslateX(diff)
    }

    const handleTouchEnd = () => {
        finishDrag()
    }

    const finishDrag = () => {
        const threshold = 50
        if (translateX > threshold && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        } else if (translateX < -threshold && currentSlide < sliderData.length - 1) {
            setCurrentSlide(currentSlide + 1)
        }
        setTranslateX(0)
        setIsDragging(false)
    }

return (
    <div className='overflow-hidden relative w-full'>
        <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out select-none cursor-grab"
            style={{
              transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
        {sliderData.map((slide) => (
            <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
            >
                <div className='md:pl-8 mt-10 md:mt-0'>
                    <p className="md:text-base text-orange-600 pb-1">
                        {slide.offer}
                    </p>
                    <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                        {slide.title}
                    </h1>
                    <div className="flex items-center mt-4 md:mt-6 ">
                        <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium">
                            {slide.buttonText1}
                        </button>
                        <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                            {slide.buttonText2}
                            <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt='arrow' width={16} height={16} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center flex-1 justify-center">
                    <Image className="md:w-72 w-48" src={slide.imgSrc} alt={slide.title} />
                </div>
            </div>
        ))}
    </div>

    {/* Dots */}
    <div className='flex items-center justify-center gap-2 mt-6'>
        {sliderData.map((_, index) => (
            <div
            key={index}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${currentSlide === index ? "bg-orange-600" : "bg-gray-400/30"}`}
            onClick={() => handleSlideChange(index)}
            />
        ))}
        </div>
    </div>
)
}

export default HeaderSlider
