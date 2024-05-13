export default function Input({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
}: {
    label?: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-medium text-slate-900">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 outline-none"
                placeholder={placeholder}
            />
        </div>
    );
}
