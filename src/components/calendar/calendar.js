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



const Calendar = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventTitle, setEventTitle] = useState("");
    const [eventAgenda, setEventAgenda] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventLevel, setEventLevel] = useState("");
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        setEvents([
            {
                id:"1",
                title : "Rapat Teknik",
                start : new Date().toISOString().split("T")[0],
            },
            {
                id : "2",
                title : "Meeting",
                start : new Date(Date.now() + 864000000).toISOString().split("T")[0]
            },
            {
                id : "3",
                title : "Workshop",
                start : new Date(Date.now() + 172800000).toISOString().split("T")[0],
                end : new Date(Date.now() + 259200000).toISOString().split("T")[0]
            }
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
        setSelectedEvent(event);
        setEventTitle(event.title);
        setEventStartDate(event.start.toISOString().split("T")[0] || "");
        setEventEndDate(event.end.toISOString().split("T")[0] || "");
        openModal();
    }

    const handleAddOrUpdateEvent = () => {
        if (selectedEvent) { 
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === selectedEvent.id
                    ?   {
                            ...event,
                            title : eventTitle,
                            start : eventStartDate,
                            end : eventEndDate,
                        }
                    : event
                )
            );
        } else {
            const newEvent = {
                id : Date.now().toString(),
                title : eventTitle,
                start : eventStartDate,
                end : eventEndDate,
                allDay : true
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
    const colorClass = `bg-green-500`;
    return (
      <div
        className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
      >
        <div className="fc-daygrid-event-dot"></div>
        <div className="fc-event-time">{eventInfo.timeText}</div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
      </div>
    );
};


export default Calendar;