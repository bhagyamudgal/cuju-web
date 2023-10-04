import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import communityImage from "@/public/images/community-1.png";

function CommunityCard() {
    return (
        <section className="py-6">
            <PageContainer>
                <div className="bg-gradient-1 flex space-x-6 rounded-[64px]">
                    <Image
                        src={communityImage}
                        alt="community-image"
                        className="rounded-l-[64px]"
                    />

                    <div className="w-full space-y-4 p-8 text-center">
                        <h2 className="text-5xl">JOIN THE COMMUNITY!</h2>

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
