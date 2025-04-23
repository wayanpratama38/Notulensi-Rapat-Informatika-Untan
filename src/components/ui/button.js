export default function Button({icon, text}) {
    return(
        <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
        >
            {icon ? <span className="w-5 h-5">{icon}</span>:<span></span>}
            <span className="text-base font-medium">{text}</span>            
        </button>
    )
}