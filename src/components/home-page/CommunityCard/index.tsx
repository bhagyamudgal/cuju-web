import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import communityImage from "@/public/images/community-1.png";

function CommunityCard() {
    return (
        <section className="py-6">
            <PageContainer>
                <div className="bg-gradient-1 flex flex-col space-y-6 rounded-[64px] md:flex-row md:space-x-6 md:space-y-0">
                    <Image
                        src={communityImage}
                        alt="community-image"
                        className="mx-auto rounded-l-[64px] rounded-r-[64px] md:rounded-r-none"
                    />

                    <div className="w-full space-y-4 p-8 text-center">
                        <h2 className="text-center text-3xl  md:text-5xl">
                            JOIN THE COMMUNITY!
                        </h2>

                        <div className="mx-auto max-w-sm space-y-2 text-lg">
                            <p>
                                Join hands with us in building futures and
                                turning dreams into reality.
                            </p>
                            <p>The future is decentralized!</p>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}

export default CommunityCard;
