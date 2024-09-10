import { PlusCircledIcon } from "@radix-ui/react-icons";


export default function Card({ name, price, img }) {
    return (
        <div className="max-w-sm h-fit bg-gray-200 border border-gray-500 rounded-lg shadow-lg relative">
            <PlusCircledIcon className="absolute top-0 right-0 m-5 lg:size-8 size-6 text-gray-200 hover:text-red-800 cursor-pointer" />
            <img className="rounded-t-lg" src={img} alt={name} />
            <div className="p-5 flex content-between flex-col">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                <p className="mb-3 text-2xl font-normal text-gray-700 text-right w-full">
                    R$ {price}
                </p>
            </div>
        </div>
    )
}