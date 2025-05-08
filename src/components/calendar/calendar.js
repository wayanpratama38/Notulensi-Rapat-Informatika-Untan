// "use client";
// import {useState, useRef, useEffect} from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { useModal } from "@/hooks/useModal";
// import { Modal } from "@/components/ui/modal";


// const participant = ["Adit","una","kevin"]


// const Calendar = () => {
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     //  event title dan agenda
//     const [eventTitle, setEventTitle] = useState("");
//     const [eventAgenda, setEventAgenda] = useState("");
//     // event date + time
//     const [eventStartDate, setEventStartDate] = useState("");
//     const [eventEndDate, setEventEndDate] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");
//     const [eventLevel, setEventLevel] = useState("");
//     // event participant
//     const [selectedParticipant, setSelectedParticipant] = useState([]);
//     const [participantList, setParticipantList] = useState(participant)
//     const [selectedPlaceholder,setSelectedPlaceholder] = useState("");
//     // array event
//     const [events, setEvents] = useState([]);
//     const calendarRef = useRef(null);
//     const { isOpen, openModal, closeModal } = useModal();

//     useEffect(() => {
//         setEvents([
//         ])
//     },[]);

//     const handleDateSelect = (selectInfo) => {
//         resetModalFields();
//         setEventStartDate(selectInfo.startStr);
//         setEventEndDate(selectInfo.endStr || selectInfo.startStr);
//         openModal();
//     };

//     const handleEventClick = (clickInfo) => {
//         const event = clickInfo.event;
        
//         console.log("Event clicked:", event);
        
//         setEventTitle(event.title);
        
//         const startDate = event.start.toISOString().split('T')[0];
//         const endDate = event.end ? event.end.toISOString().split('T')[0] : startDate;
        
//         setEventStartDate(startDate);
//         setEventEndDate(endDate);
        
//         const startTimeStr = event.start.toISOString().split('T')[1].substring(0, 5);
//         const endTimeStr = event.end ? event.end.toISOString().split('T')[1].substring(0, 5) : startTimeStr;
        
//         setStartTime(startTimeStr);
//         setEndTime(endTimeStr);
        
//         const eventParticipants = event.extendedProps?.participants || [];
//         setSelectedParticipant(eventParticipants);
    
//         setParticipantList(participant.filter(p => !eventParticipants.includes(p)));
        
//         setEventAgenda(event.extendedProps.agenda || "");
        
//         openModal();
//     }

//     const handleParticipantSelect = (event) => {
//         const selected = event.target.value;
//         if(selected && !selectedParticipant.includes(selected)){
//             setSelectedParticipant((prevParticipants)=>[...prevParticipants,selected])
//             setParticipantList((prevList)=> prevList.filter((participant)=> participant !== selected));
//             setSelectedPlaceholder("");
//         }
//     }

//     const handleRemoveParticipant = (participant) => {
//         setSelectedParticipant((prevParticipants) =>
//             prevParticipants.filter((p) => p!== participant)
//         );

//         setParticipantList((prevList)=>[...prevList,participant]);
//     };

//     const handleAddOrUpdateEvent = () => {
//         const fullStartDate = `${eventStartDate}T${startTime}:00`;  // Menggabungkan tanggal dan waktu mulai
//         const fullEndDate = `${eventEndDate}T${endTime}:00`;  // Menggabungkan tanggal dan waktu berakhir
        
//         if (selectedEvent) { 
//             setEvents((prevEvents) =>
//                 prevEvents.map((event) =>
//                     event.id === selectedEvent.id
//                     ?   {
//                             ...event,
//                             title : eventTitle,
//                             start : fullStartDate,
//                             end : fullEndDate,
//                             participants : selectedParticipant,
//                             agenda : eventAgenda
//                         }
//                     : event
//                 )
//             );
//         } else {
//             const newEvent = {
//                 id : Date.now().toString(),
//                 title : eventTitle,
//                 start : fullStartDate,
//                 end : fullEndDate,
//                 participants : selectedParticipant,
//                 agenda :eventAgenda,
//                 allDay : false
//             };
//             setEvents((prevEvents) => [...prevEvents, newEvent]);
//         }
//         closeModal();
//         resetModalFields();
//     };

//     const resetModalFields = () => {
//         setEventTitle("");
//         setEventStartDate("");
//         setEventAgenda("");
//         setEventEndDate("");
//         setEventLevel("");
//         setStartTime("");
//         setEndTime("");
//         setSelectedParticipant([]);
//         setParticipantList([...participant]);
//         setSelectedEvent(null);
//     };

//     return (
//         // <div className="rounded-2x1 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="rounded-2xl border bg-red dark:bg-red-200 dark:bg-white/[0.03]">
//             <div className="">
//                 <FullCalendar
//                     ref={calendarRef}
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     headerToolbar ={{
//                         left : "prev,next addEventButton",
//                         center : "title",
//                         right : "dayGridMonth,timeGridWeek,timeGridDay"
//                     }}
//                     buttonText={{
//                         dayGridMonth : "Bulan",
//                         timeGridWeek : "Minggu",
//                         timeGridDay : "Hari"
//                     }}
//                     events = {events}
//                     selectable = {true}
//                     select = {handleDateSelect}
//                     eventClick = {handleEventClick}
//                     eventContent = {renderEventContent}
//                     customButtons={{
//                         addEventButton : {
//                             text : "Add Event +",
//                             click : openModal,
//                         }
//                     }}
//                 />
//                 <Modal
//                     isOpen={isOpen}
//                     onClose={closeModal}
//                     className="max-w-[700px] p-6 lg:p-10"
//                 >
//                     <div className="flex flex-col px-2 overflow-y-auto custom-scroll">
//                         <div>
//                             <h5 
//                                 className="mb-2 text-white text-lg ">
//                                 {selectedEvent ? "Edit Rapat" : "Tambah Rapat Baru"}
//                             </h5>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                                 Silahkan masukkan informasi rapat
//                             </p>
//                         </div>
//                         <div className="mt-8">
//                             <div>
//                                 <div>
//                                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                         Nama Rapat
//                                     </label>
//                                     <input 
//                                         id="event-title"
//                                         type="text"
//                                         value={eventTitle}
//                                         onChange={(e)=> setEventTitle(e.target.value)}
//                                         className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-6">
//                                 <div>
//                                     <div>
//                                         <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                             Agenda Rapat
//                                         </label>
//                                         <textarea
//                                             id="event-agenda"
//                                             type="text"
//                                             value={eventAgenda}
//                                             onChange={(e)=> setEventAgenda(e.target.value)}
//                                             className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-6">
//                                 <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                     Peserta Rapat
//                                 </label>
//                                 <select
//                                     onChange={handleParticipantSelect}
//                                     value={selectedPlaceholder}
//                                     className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
//                                 >
//                                     <option value="">Pilih Peserta Rapat</option>
//                                     {participantList.map((participant, index) => (
//                                         <option key={index} value={participant}>{participant}</option>
//                                     ))}
//                                 </select>
//                                 <div className="mt-4">
//                                     {selectedParticipant.map((participant, index) => (
//                                         <div
//                                             key={index}
//                                             className="inline-flex items-center space-x-2 py-1 px-3 m-1 bg-blue-500 text-white rounded-full"
//                                         >
//                                             <span>{participant}</span>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => handleRemoveParticipant(participant)}
//                                                 className="text-white font-bold"
//                                             >
//                                                 &times;
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="mt-6">
//                                 <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                     Tanggal Rapat
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         id="event-start-date"
//                                         type="date"
//                                         value={eventStartDate}
//                                         onChange={(e) => setEventStartDate(e.target.value)}
//                                         className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
//                                 />
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="mt-6">
//                                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                         Waktu Mulai Rapat
//                                     </label>
//                                     <input
//                                         type="time"
//                                         value={startTime}
//                                         onChange={(e) => setStartTime(e.target.value)}
//                                         className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
//                                     />
//                                 </div>

//                                 <div className="mt-6">
//                                     <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
//                                         Waktu Selesai Rapat
//                                     </label>
//                                     <input
//                                         type="time"
//                                         value={endTime}
//                                         onChange={(e) => setEndTime(e.target.value)}
//                                         className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
//                             <button
//                                 onClick={closeModal}
//                                 type="button"
//                                 className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50  dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
//                             >
//                                 Batal
//                             </button>
//                             <button
//                                 onClick={handleAddOrUpdateEvent}
//                                 type="button"
//                                 className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
//                             >
//                                 {selectedEvent ? "Simpan Perubahan" : "Tambah Rapat"}
//                             </button>
//                         </div>
//                     </div>
//                 </Modal>
//             </div>
//         </div>
//     )
// }

// const renderEventContent = (eventInfo) => {
//     console.log("RENDER EVENT CONTENT",eventInfo)
//     const {event} = eventInfo
//     const startTime = event._instance.range.start.toLocaleTimeString([],{
//         hour : '2-digit',
//         minute : '2-digit'
//     })

//     const endTime = event._instance.range.end.toLocaleTimeString([],{
//         hour : '2-digit',
//         minute : '2-digit'
//     })

    
//     return (
//       <div
//         className={`event-fc-color p-1 fc-event-main fc-bg-success rounded-sm flex flex-col`}
//       >
//         <div className="fc-event-title">{eventInfo.event.title}</div>
//       </div>
//     );
// };


// export default Calendar;




"use client";
import {useState, useRef, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { // Komentari atau hapus jika tidak digunakan semua
//   EventInput,
//   DateSelectArg,
//   EventClickArg,
//   EventContentArg,
// } from "@fullcalendar/core";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";


const participant = ["Adit","una","kevin"]


const Calendar = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    //  event title dan agenda
    const [eventTitle, setEventTitle] = useState("");
    const [eventAgenda, setEventAgenda] = useState("");
    // event date + time
    const [eventStartDate, setEventStartDate] = useState("");
    // const [eventEndDate, setEventEndDate] = useState(""); // DIHAPUS
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // const [eventLevel, setEventLevel] = useState(""); // DIHAPUS jika tidak digunakan
    // event participant
    const [selectedParticipant, setSelectedParticipant] = useState([]);
    const [participantList, setParticipantList] = useState(participant)
    const [selectedPlaceholder,setSelectedPlaceholder] = useState("");
    // array event
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        // Anda bisa memuat event awal dari API atau localStorage di sini jika perlu
        setEvents([
            // Contoh event jika diperlukan untuk testing awal
            // {
            //     id: '1',
            //     title: 'Meeting Pagi',
            //     start: new Date().toISOString().split('T')[0] + 'T10:00:00', // Hari ini jam 10:00
            //     end: new Date().toISOString().split('T')[0] + 'T11:00:00',   // Hari ini jam 11:00
            //     agenda: 'Diskusi progres mingguan',
            //     participants: ['Adit']
            // }
        ])
    },[]);

    const handleDateSelect = (selectInfo) => {
        resetModalFields();
        setSelectedEvent(null); // Pastikan selectedEvent di-reset
        setEventStartDate(selectInfo.startStr);
        // setEventEndDate(selectInfo.endStr || selectInfo.startStr); // DIHAPUS, end date tidak lagi digunakan secara terpisah di form
        openModal();
    };

    const handleEventClick = (clickInfo) => {
        const event = clickInfo.event;
        
        setSelectedEvent(event); // Set event yang dipilih untuk diedit
        
        setEventTitle(event.title);
        
        const startDate = event.start ? event.start.toISOString().split('T')[0] : "";
        // const endDate = event.end ? event.end.toISOString().split('T')[0] : startDate; // DIHAPUS
        
        setEventStartDate(startDate);
        // setEventEndDate(endDate); // DIHAPUS

        const startTimeStr = event.start ? event.start.toISOString().split('T')[1].substring(0, 5) : "00:00";
        // Jika event.end tidak ada atau sama dengan start, gunakan durasi default atau logika lain
        const endTimeStr = event.end ? event.end.toISOString().split('T')[1].substring(0, 5) : startTimeStr;
        
        setStartTime(startTimeStr);
        setEndTime(endTimeStr);
        
        const eventParticipants = event.extendedProps?.participants || [];
        setSelectedParticipant(eventParticipants);
    
        setParticipantList(participant.filter(p => !eventParticipants.includes(p)));
        
        setEventAgenda(event.extendedProps.agenda || "");
        
        openModal();
    }

    const handleParticipantSelect = (event) => {
        const selected = event.target.value;
        if(selected && !selectedParticipant.includes(selected)){
            setSelectedParticipant((prevParticipants)=>[...prevParticipants,selected])
            setParticipantList((prevList)=> prevList.filter((participant)=> participant !== selected));
            setSelectedPlaceholder("");
        }
    }

    const handleRemoveParticipant = (participantToRemove) => { // Ganti nama parameter agar jelas
        setSelectedParticipant((prevParticipants) =>
            prevParticipants.filter((p) => p!== participantToRemove)
        );

        setParticipantList((prevList)=>[...prevList, participantToRemove].sort()); // Tambah dan urutkan kembali
    };

    const handleAddOrUpdateEvent = () => {
        if (!eventStartDate || !startTime || !endTime || !eventTitle) {
            alert("Harap isi semua field yang diperlukan (Nama Rapat, Tanggal, Waktu Mulai, Waktu Selesai).");
            return;
        }

        // Asumsikan end date sama dengan start date
        const fullStartDate = `${eventStartDate}T${startTime}:00`;
        const fullEndDate = `${eventStartDate}T${endTime}:00`; // Menggunakan eventStartDate untuk tanggal akhir

        const eventData = {
            title : eventTitle,
            start : fullStartDate,
            end : fullEndDate, // Tetap kirim end, tapi tanggalnya sama dengan start
            extendedProps: { // Simpan data custom di extendedProps
                participants : selectedParticipant,
                agenda : eventAgenda,
            },
            allDay : false // Jika event Anda tidak pernah all day
        };
        
        if (selectedEvent && selectedEvent.id) { 
            // Update event
            const calendarApi = calendarRef.current.getApi();
            const eventToUpdate = calendarApi.getEventById(selectedEvent.id);
            if (eventToUpdate) {
                eventToUpdate.setProp('title', eventData.title);
                eventToUpdate.setStart(eventData.start);
                eventToUpdate.setEnd(eventData.end);
                eventToUpdate.setExtendedProp('participants', eventData.extendedProps.participants);
                eventToUpdate.setExtendedProp('agenda', eventData.extendedProps.agenda);
            }
            // Atau jika Anda mengelola state events secara manual:
            // setEvents((prevEvents) =>
            //     prevEvents.map((event) =>
            //         event.id === selectedEvent.id
            //         ?   { ...event, ...eventData, id: selectedEvent.id } // Pastikan id tidak berubah
            //         : event
            //     )
            // );
        } else {
            // Add new event
            const newEventForApi = {
                id : Date.now().toString(), // FullCalendar akan generate ID jika tidak ada, tapi lebih baik kita set
                ...eventData
            };
            const calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent(newEventForApi);
            // Atau jika Anda mengelola state events secara manual:
            // setEvents((prevEvents) => [...prevEvents, newEventForApi]);
        }
        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setEventTitle("");
        setEventStartDate("");
        setEventAgenda("");
        // setEventEndDate(""); // DIHAPUS
        // setEventLevel(""); // DIHAPUS jika tidak digunakan
        setStartTime("");
        setEndTime("");
        setSelectedParticipant([]);
        setParticipantList([...participant].sort()); // Urutkan daftar partisipan awal
        setSelectedEvent(null);
        setSelectedPlaceholder("");
    };

    return (
        <div className="calendar-container rounded-2xl border bg-red dark:bg-red-200 dark:bg-white/[0.03]"> {/* Ganti kelas calendar-container jika perlu */}
            <div className="custom-calendar"> 
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar ={{
                        left : "prev,next addEventButton",
                        center : "title",
                        right : "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    buttonText={{
                        dayGridMonth : "Bulan",
                        timeGridWeek : "Minggu",
                        timeGridDay : "Hari"
                    }}
                    events = {events} 
                    selectable = {true}
                    select = {handleDateSelect}
                    eventClick = {handleEventClick}
                    eventContent = {renderEventContent} 
                    customButtons={{
                        addEventButton : {
                            text : "Add Event +", 
                            click : () => {
                                resetModalFields(); 
                                setSelectedEvent(null);
                                 if (!eventStartDate) {
                                    setEventStartDate(new Date().toISOString().split('T')[0]);
                                }
                                openModal();
                            },
                        }
                    }}
                    editable={true}
                />
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                   className="max-w-[700px] p-6 lg:p-10" 
                >
                    <div className="flex flex-col px-2 overflow-y-auto custom-scroll"> {}
                        <div>
                            <h5 
                                className="mb-2 text-white text-lg modal-title"> {}
                                {selectedEvent ? "Edit Rapat" : "Tambah Rapat Baru"}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Silahkan masukkan informasi rapat
                            </p>
                        </div>
                        <div className="mt-8">
                            
                            <div className="mb-6"> 
                                <label htmlFor="event-title" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Nama Rapat
                                </label>
                                <input 
                                    id="event-title"
                                    type="text"
                                    value={eventTitle}
                                    onChange={(e)=> setEventTitle(e.target.value)}
                                    className="modal-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
                                />
                            </div>
                            {/* Agenda Rapat */}
                            <div className="mb-6">
                                <label htmlFor="event-agenda" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Agenda Rapat
                                </label>
                                <textarea
                                    id="event-agenda"
                                    value={eventAgenda}
                                    onChange={(e)=> setEventAgenda(e.target.value)}
                                    rows={3} 
                                    className="modal-input dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label htmlFor="participant-select" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Peserta Rapat
                                </label>
                                <select
                                    id="participant-select"
                                    onChange={handleParticipantSelect}
                                    value={selectedPlaceholder} 
                                    className="modal-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                >
                                    <option value="" disabled>Pilih Peserta Rapat</option>
                                    {participantList.map((participantName, index) => ( 
                                        <option key={index} value={participantName}>{participantName}</option>
                                    ))}
                                </select>
                                <div className="mt-4 flex flex-wrap gap-2"> 
                                    {selectedParticipant.map((participantName, index) => ( 
                                        <div
                                            key={index}
                                            className="inline-flex items-center space-x-2 py-1 px-3 bg-blue-500 text-white rounded-full text-xs" // Kecilkan teks pill
                                        >
                                            <span>{participantName}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveParticipant(participantName)}
                                                className="ml-1 text-white font-bold hover:text-red-300" // Beri jarak dan hover state
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="event-start-date" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Tanggal Rapat
                                </label>
                                <div className="relative">
                                    <input
                                        id="event-start-date"
                                        type="date"
                                        value={eventStartDate}
                                        onChange={(e) => setEventStartDate(e.target.value)}
                                        className="modal-input dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="mb-6 sm:mb-0">
                                    <label htmlFor="start-time" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Waktu Mulai Rapat
                                    </label>
                                    <input
                                        id="start-time"
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="modal-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-time" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Waktu Selesai Rapat
                                    </label>
                                    <input
                                        id="end-time"
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="modal-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 modal-footer sm:justify-end"> {/* Beri border atas */}
                            <button
                                onClick={closeModal}
                                type="button"
                                className="modal-footer-button modal-footer-close flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50  dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAddOrUpdateEvent}
                                type="button"
                                className="modal-footer-button modal-footer-action btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                {selectedEvent ? "Simpan Perubahan" : "Tambah Rapat"}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

const renderEventContent = (eventInfo) => {
    // console.log("RENDER EVENT CONTENT",eventInfo)
    // const {event} = eventInfo // event sudah ada di eventInfo
    // const startTime = eventInfo.event.start ? eventInfo.event.start.toLocaleTimeString([],{ // Cek null
    //     hour : '2-digit',
    //     minute : '2-digit'
    // }) : "";

    // const endTime = eventInfo.event.end ? eventInfo.event.end.toLocaleTimeString([],{ // Cek null
    //     hour : '2-digit',
    //     minute : '2-digit'
    // }) : "";

    // Warna event bisa ditentukan berdasarkan properti event atau kategori
    // const eventColorClass = eventInfo.event.extendedProps.level === 'Penting' ? 'fc-bg-danger' : 'fc-bg-primary';
    const eventColorClass = 'fc-bg-primary'; // Default color, bisa diubah

    return (
      <div
        // className={`${eventColorClass} event-fc-color p-1 fc-event-main rounded-sm flex flex-col`} // Hapus fc-bg-success jika ingin dinamis
        className={`${eventColorClass} event-fc-color p-1 fc-event-main rounded-sm flex flex-col text-xs`} // Tambah text-xs
      >
        <div className="fc-event-title font-semibold">{eventInfo.event.title}</div>
        {/* Tambahkan info lain jika perlu, misal waktu atau agenda singkat */}
        {/* <div className="text-xs opacity-80">{startTime} - {endTime}</div> */}
        {eventInfo.event.extendedProps.agenda && <div className="text-xs opacity-70 truncate">{eventInfo.event.extendedProps.agenda}</div>}
      </div>
    );
};


export default Calendar;