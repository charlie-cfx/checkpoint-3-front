import Header from "@/components/Header";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Country } from "./types/country.type";
import Link from "next/link";

const GET_COUNTRIES = gql`
    query getCountries {
        countries {
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

const ADD_COUNTRY = gql`
    mutation addCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
        }
    }
`;

export default function Home() {
    const [countries, setCountries] = useState<[Country] | null>(null);
    const [isReloading, setIsReloading] = useState<boolean>(false);

    const [getCountries, { loading, error, data }] =
        useLazyQuery(GET_COUNTRIES);
    const [addCountry] = useMutation(ADD_COUNTRY);

    function refetchCountries() {
        getCountries({
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                setCountries(data.countries);
            },
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form: EventTarget = e.target;
        const formData = new FormData(form as HTMLFormElement);

        addCountry({
            variables: {
                data: {
                    code: formData.get("country-code") as string,
                    name: formData.get("country-name") as string,
                    emoji: formData.get("country-emoji") as string,
                    continent: {
                        id: parseInt(
                            formData.get("country-continent") as string
                        ),
                    },
                },
            },
            onCompleted: () => {
                refetchCountries();
            },
        });
    }

    useEffect(() => {
        getCountries({
            onCompleted: (data) => {
                setCountries(data.countries);
            },
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <Header />

            <main className="container mx-auto flex flex-col gap-6">
                <div className="border border-solid border-slate-200 p-4 rounded-md flex flex-col gap-6">
                    <h2 className="font-accent text-2xl text-slate-900">
                        Add a new country
                    </h2>
                    <form
                        action=""
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label
                                    htmlFor="country-code"
                                    className="block mb-2 text-sm font-medium text-slate-900"
                                >
                                    Country code
                                </label>
                                <input
                                    type="text"
                                    name="country-code"
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 outline-none"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="country-name"
                                    className="block mb-2 text-sm font-medium text-slate-900"
                                >
                                    Country name
                                </label>
                                <input
                                    type="text"
                                    name="country-name"
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 outline-none"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="country-emoji"
                                    className="block mb-2 text-sm font-medium text-slate-900"
                                >
                                    Country emoji
                                </label>
                                <input
                                    type="text"
                                    name="country-emoji"
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 outline-none"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="country-continent"
                                    className="block mb-2 text-sm font-medium text-slate-900"
                                >
                                    Country continent
                                </label>
                                <input
                                    type="text"
                                    name="country-continent"
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 outline-none"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex w-fit items-center gap-1.5 bg-amber-600 hover:bg-amber-700 cursor-pointer text-white px-2 py-1 rounded-md shadow-sm"
                        >
                            Add{" "}
                            <i className="fi fi-rr-plus-small flex h-full justify-center"></i>
                        </button>
                    </form>
                </div>
                <h2 className="font-accent text-2xl text-slate-900">
                    List of existing countries
                </h2>
                <ul className="grid sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {countries &&
                        countries.length > 0 &&
                        countries.map((country) => (
                            <li key={country.id}>
                                <Link
                                    href={`country/${country.code}`}
                                    className="p-4 bg-white border border-solid border-slate-200 rounded-md flex justify-between items-center shadow-sm hover:bg-slate-50"
                                >
                                    <div className="flex flex-col">
                                        <h3 className="font-medium text-xl text-slate-900">
                                            {country.emoji} {country.name}
                                        </h3>
                                        <span className="text-slate-600">
                                            {country.continent.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fi fi-rr-angle-right"></i>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>
            </main>
        </>
    );
}
