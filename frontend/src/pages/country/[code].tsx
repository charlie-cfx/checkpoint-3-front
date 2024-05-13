import Header from "@/components/Header";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CountryPage() {
    const router = useRouter();
    const { code } = router.query as { code: string };

    const [country, setCountry] = useState<Country | null>(null);

    const GET_COUNTRY = gql`
        query getCountry($code: String!) {
            country(code: $code) {
                id
                code
                name
                emoji
                continent {
                    id
                    name
                }
            }
        }
    `;

    const { loading, error } = useQuery(GET_COUNTRY, {
        variables: { code },
        onCompleted: (data) => {
            setCountry(data.country);
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <>
            <Header />
            <main className="container mx-auto flex flex-col gap-6 p-3 md:p-6">
                {country && (
                    <>
                        <h2 className="font-accent font-medium text-2xl text-slate-900">
                            {country.name}
                        </h2>
                        <p className="flex gap-2">
                            Code:{" "}
                            <span className="text-slate-600">
                                {country.code}
                            </span>
                        </p>
                        {country.continent && (
                            <p className="flex gap-2">
                                Continent:{" "}
                                <span className="text-slate-600">
                                    {country.continent.name}
                                </span>
                            </p>
                        )}
                        <p>Emoji :</p>
                        <p className="p-5 bg-slate-50 rounded-md size-56 flex items-center justify-center text-9xl">
                            {country.emoji}
                        </p>
                    </>
                )}
            </main>
        </>
    );
}
