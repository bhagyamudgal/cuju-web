"use client";

import Image from "next/image";

import heroSectionImage2 from "@/public/images/hero-section-2.png";
import heroSectionImage3 from "@/public/images/hero-section-3.svg";

function HeroImage() {
    return (
        <div className="absolute right-0 top-0">
            <div className="relative">
                <Image
                    src={heroSectionImage2}
                    alt="hero-section-image-2"
                    className="absolute left-10"
                />

                <Image
                    src={heroSectionImage3}
                    alt="hero-section-image-3"
                    className=""
                />
            </div>
        </div>
    );
}

export default HeroImage;
