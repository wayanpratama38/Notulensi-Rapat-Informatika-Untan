"use client";
import {useState, useRef, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
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
    const [eventEndDate, setEventEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [eventLevel, setEventLevel] = useState("");
    // event participant
    const [selectedParticipant, setSelectedParticipant] = useState([]);
    const [participantList, setParticipantList] = useState(participant)
    const [selectedPlaceholder,setSelectedPlaceholder] = useState("");
    // array event
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        setEvents([
        ])
    },[]);

    const handleDateSelect = (selectInfo) => {
        resetModalFields();
        setEventStartDate(selectInfo.startStr);
        setEventEndDate(selectInfo.endStr || selectInfo.startStr);
        openModal();
    };

    const handleEventClick = (clickInfo) => {
        const event = clickInfo.event;
        
        console.log("Event clicked:", event);

        // setSelectedEvent({
        //     id: event.id,
        //     title: event.title,
        //     start: event.startStr || event.start.toISOString(),
        //     end: event.endStr || event.end.toISOString(),
        //     participants: event.extendedProps.participants || [],
        //     agenda: event.extendedProps.agenda || ""
        // });
        
        setEventTitle(event.title);
        
        const startDate = event.start.toISOString().split('T')[0];
        const endDate = event.end ? event.end.toISOString().split('T')[0] : startDate;
        
        setEventStartDate(startDate);
        setEventEndDate(endDate);
        
        const startTimeStr = event.start.toISOString().split('T')[1].substring(0, 5);
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

    const handleRemoveParticipant = (participant) => {
        setSelectedParticipant((prevParticipants) =>
            prevParticipants.filter((p) => p!== participant)
        );

        setParticipantList((prevList)=>[...prevList,participant]);
    };

    const handleAddOrUpdateEvent = () => {
        const fullStartDate = `${eventStartDate}T${startTime}:00`;  // Menggabungkan tanggal dan waktu mulai
        const fullEndDate = `${eventEndDate}T${endTime}:00`;  // Menggabungkan tanggal dan waktu berakhir
        
        if (selectedEvent) { 
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedEvent.id
                    ?   {
                            ...event,
                            title : eventTitle,
                            start : fullStartDate,
                            end : fullEndDate,
                            participants : selectedParticipant,
                            agenda : eventAgenda
                        }
                    : event
                )
            );
        } else {
            const newEvent = {
                id : Date.now().toString(),
                title : eventTitle,
                start : fullStartDate,
                end : fullEndDate,
                participants : selectedParticipant,
                agenda :eventAgenda,
                allDay : false
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
        closeModal();
        resetModalFields();
    };

    const resetModalFields = () => {
        setEventTitle("");
        setEventStartDate("");
        setEventAgenda("");
        setEventEndDate("");
        setEventLevel("");
        setStartTime("");
        setEndTime("");
        setSelectedParticipant([]);
        setParticipantList([...participant]);
        setSelectedEvent(null);
    };

    return (
        <div className="rounded-2x1 border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
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
                            click : openModal,
                        }
                    }}
                />
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    className="max-w-[700px] p-6 lg:p-10"
                >
                    <div className="flex flex-col px-2 overflow-y-auto custom-scroll">
                        <div>
                            <h5 
                                className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                                {selectedEvent ? "Edit Event" : "Add Event"}
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Plan your next big moment: schedule or edit an event to stay on track
                            </p>
                        </div>
                        <div className="mt-8">
                            <div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Rapat
                                    </label>
                                    <input 
                                        id="event-title"
                                        type="text"
                                        value={eventTitle}
                                        onChange={(e)=> setEventTitle(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" 
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <div>
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Agenda
                                        </label>
                                        <textarea
                                            id="event-agenda"
                                            type="text"
                                            value={eventAgenda}
                                            onChange={(e)=> setEventAgenda(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Participants
                                </label>
                                <select
                                    onChange={handleParticipantSelect}
                                    value={selectedPlaceholder}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                >
                                    <option value="">Select Participant</option>
                                    {participantList.map((participant, index) => (
                                        <option key={index} value={participant}>{participant}</option>
                                    ))}
                                </select>
                                <div className="mt-4">
                                    {selectedParticipant.map((participant, index) => (
                                        <div
                                            key={index}
                                            className="inline-flex items-center space-x-2 py-1 px-3 m-1 bg-blue-500 text-white rounded-full"
                                        >
                                            <span>{participant}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveParticipant(participant)}
                                                className="text-white font-bold"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Enter Start Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="event-start-date"
                                            type="date"
                                            value={eventStartDate}
                                            onChange={(e) => setEventStartDate(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Enter End Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="event-end-date"
                                            type="date"
                                            value={eventEndDate}
                                            onChange={(e) => setEventEndDate(e.target.value)}
                                            className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                    />
                                </div>

                                <div className="mt-6">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:ring-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleAddOrUpdateEvent}
                                type="button"
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                {selectedEvent ? "Update Changes" : "Add Event"}
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

const renderEventContent = (eventInfo) => {
    console.log("RENDER EVENT CONTENT",eventInfo)
    const {event} = eventInfo
    const startTime = event._instance.range.start.toLocaleTimeString([],{
        hour : '2-digit',
        minute : '2-digit'
    })

    const endTime = event._instance.range.end.toLocaleTimeString([],{
        hour : '2-digit',
        minute : '2-digit'
    })

    
    return (
      <div
        className={`event-fc-color p-1 fc-event-main fc-bg-success rounded-sm flex flex-col`}
      >
        <div className="fc-event-title">{eventInfo.event.title}</div>
      </div>
    );
};


export default Calendar;