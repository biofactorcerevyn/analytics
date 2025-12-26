import { useEffect, useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function Productssheet() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://sheetdb.io/api/v1/apdbic2okpv87")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Error loading products");
                setLoading(false);
            });
    }, []);

    const { chartData, uniqueVariants } = useMemo(() => {
        const productGroups = {};
        const variantsSet = new Set();

        products.forEach((p) => {
            const name = p.productname || "Unknown";
            const variant = p.varient1 || "Unknown";
            const cases = parseInt(p.cases) || 0;

            if (!productGroups[name]) {
                productGroups[name] = { name };
            }

            if (productGroups[name][variant]) {
                productGroups[name][variant] += cases;
            } else {
                productGroups[name][variant] = cases;
            }

            variantsSet.add(variant);
        });

        const data = Object.values(productGroups);
        const variants = Array.from(variantsSet);

        return { chartData: data, uniqueVariants: variants };
    }, [products]);

    const pieData = useMemo(() => {
        const variantGroups = {};
        products.forEach((p) => {
            const variant = p.varient1 || "Unknown";
            const cases = parseInt(p.cases) || 0;
            if (variantGroups[variant]) {
                variantGroups[variant] += cases;
            } else {
                variantGroups[variant] = cases;
            }
        });
        return Object.keys(variantGroups).map((key) => ({
            name: key,
            value: variantGroups[key],
        }));
    }, [products]);

    if (loading) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div className="text-white text-xl">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            <div className="animate-fadeInUp">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    Products Sheet
                </h1>
                <p className="text-lg text-white/70">
                    Manage your product inventory from SheetDB
                </p>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp delay-100">
                <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Total Cases by Product (Variant Breakdown)
                    </h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                                    tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.5)"
                                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(0,0,0,0.8)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        color: "#fff",
                                    }}
                                />
                                <Legend />
                                {uniqueVariants.map((variant, index) => (
                                    <Bar
                                        key={variant}
                                        dataKey={variant}
                                        stackId="a"
                                        fill={COLORS[index % COLORS.length]}
                                        radius={index === uniqueVariants.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Cases Distribution by Variant 1
                    </h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(0,0,0,0.8)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        color: "#fff",
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden animate-fadeInUp delay-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white/70 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white/70 uppercase tracking-wider">
                                    Sku
                                </th>
                                
                                <th className="px-6 py-4 text-left text-sm font-semibold text-white/70 uppercase tracking-wider">
                                    Cases
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-white/50">
                                        No products found in the sheet.
                                    </td>
                                </tr>
                            ) : (
                                products.map((p, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-white font-medium">
                                            {p.productname || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-white/80">
                                            {p.Sku || "-"}
                                        </td>
                                       
                                        <td className="px-6 py-4 text-white/80">
                                            {p.cases || "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
