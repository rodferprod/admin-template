export default function Logo(){
    return (
        <div className={`
            flex flex-col justify-center items-center
            w-10 h-10 rounded-full
            bg-white
        `}>
            <div className={`w-3 h-3 rounded-full bg-red-600 mb-0.5`} />
            <div className="flex">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mt-0.5 mr-0.5" />
                <div className="w-3 h-3 rounded-full bg-green-600 mt-0.5 ml-0.5"  />
            </div>
        </div>
    )
}