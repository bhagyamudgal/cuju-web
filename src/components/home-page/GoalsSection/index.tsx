import Image from "next/image";

import PageContainer from "../../common/PageContainer";
import goalImage1 from "@/public/images/goal-1.png";
import goalImage2 from "@/public/images/goal-2.png";
import goalImage3 from "@/public/images/goal-3.png";
import goalImage4 from "@/public/images/goal-4.png";

const GOALS = [
    {
        id: 1,
        image: goalImage1,
        content: `Support DFA boys morally and academically and 
        lead them to their target of becoming 
        professional footballers.`,
    },
    {
        id: 2,
        image: goalImage2,
        content: `Instructing and educating the team on fundamental aspects of the game, not only the aspects of football; but also the principles of unity, teamwork, and perseverance toward their goals.`,
    },
    {
        id: 3,
        image: goalImage3,
        content: `Provide the team members of DFA with full football kits/gear (Jerseys, Boots, Shin Guards, Hose, Nutritional accommodations…)`,
    },
    {
        id: 4,
        image: goalImage4,
        content: `Teaching the team Information & Technology (Internet, Blockchain, etc.)`,
    },
];

function GoalsSection() {
    return (
        <section className="py-6">
            <PageContainer className="space-y-6">
                <h2 className="text-center text-5xl text-primary">
                    DFA Goals and Plans
                </h2>

                <div className="flex flex-wrap justify-center">
                    {GOALS.map((goal) => {
                        return (
                            <div
                                key={goal.id}
                                className="bg-gradient-1 m-4 w-full rounded-[64px] text-center md:w-[40%]"
                            >
                                <Image
                                    className="w-full rounded-t-[64px]"
                                    src={goal.image}
                                    alt={`goal-image-${goal.id}`}
                                />

                                <p className="p-6">{goal.content}</p>
                            </div>
                        );
                    })}
                </div>
            </PageContainer>
        </section>
    );
}

export default GoalsSection;
