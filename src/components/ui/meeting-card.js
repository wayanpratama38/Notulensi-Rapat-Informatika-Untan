export default function MeetingCard({name,date,status}) {
    return(
        <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
            {name}
        </h3>
        
        <div className="flex items-center space-x-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>
            {new Date(date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}
            </span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>
            {new Date(date).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            })}
            </span>
        </div>
        
        <div className="flex justify-end">
            <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
            {status === 'active' ? 'Aktif' : 'Selesai'}
            </span>
        </div>
        </div>
    )
}