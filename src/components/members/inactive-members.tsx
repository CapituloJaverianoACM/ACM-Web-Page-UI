import { Member } from "@/models/member.model";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/controllers/member.controller";
import { InactiveMembersHeader } from "./sections/header";
import { InactiveMembersTimeline } from "./sections/timeline";

const InactiveMembers = () => {

    const { data: members, isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const members : Member[] = await getMembers();
            return members.filter( member => !member.active ).map( member => {
                member.role = "Ex-"+member.role;
                return member;
            });
        }
    });


    // Group and sort members by period
    const grouped = isLoading ? {} as Record<string, Member[]> : members.reduce(
        (acc, m) => {
            const period = m.memberSince || "Sin periodo";
            (acc[period] = acc[period] || []).push(m);
            return acc;
        },
        {} as Record<string, Member[]>,
    );

    const sortedPeriods = Object.keys(grouped).sort((a, b) => {
        if (a === "Sin periodo") return 1;
        if (b === "Sin periodo") return -1;
        const [yA, sA] = a.split("-").map(Number);
        const [yB, sB] = b.split("-").map(Number);
        return yB - yA || sB - sA;
    });

    return (
        <div className="pt-[10vh] min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 ">
                <div className="space-y-8">
                    {/* Header */}
                    <InactiveMembersHeader /> 

                    {/* Timeline */}
                    <InactiveMembersTimeline sortedPeriods={sortedPeriods} grouped={grouped} />
                </div>
            </div>
        </div>
    );
};

export default InactiveMembers;
