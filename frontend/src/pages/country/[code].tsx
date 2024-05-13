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

    const { loading, error, data } = useQuery(GET_COUNTRY, {
        variables: { code },
        onCompleted: (data) => {
            setCountry(data.country);
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            <h1>{country?.name}</h1>
            <p>{country?.emoji}</p>
            <p>{country?.continent.name}</p>
        </div>
    );
}
