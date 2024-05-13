import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-amber-100 border-b border-solid border-b-amber-200 p-3 flex justify-between items-center text-amber-800">
            <h1 className="text-lg font-accent font-medium">Checkpoint : frontend</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/" className="flex gap-1.5 items-center"><i className="fi fi-rr-home flex h-full items-center"></i>Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
