import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

const DashboardGraph = ({ data }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <BarChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <defs>
                    <linearGradient
                        id="yellowGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                </defs>

                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                />


                <YAxis
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip />

                <Bar
                    dataKey="projects"
                    fill="url(#yellowGradient)"
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DashboardGraph;