"use client";

import Image from "next/image";

import heroSectionImage2 from "@/public/images/hero-section-2.png";
// import heroSectionImage3 from "@/public/images/hero-section-3.svg";

function HeroImage() {
    return (
        <div className="absolute -top-36 right-96 hidden scale-75 xl:block">
            <Image src={heroSectionImage2} alt="hero-section-image-2" />

            {/* <Image
                src={heroSectionImage3}
                alt="hero-section-image-3"
                className=""
            /> */}
        </div>
    );
}

export default HeroImage;
