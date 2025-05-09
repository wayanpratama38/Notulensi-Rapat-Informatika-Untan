// src/components/calendar/calendar.js
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react"; 
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { useRouter } from 'next/navigation'; 



const Calendar = () => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [eventTitle, setEventTitle] = useState("");
  const [eventAgenda, setEventAgenda] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  
  const [allParticipants, setAllParticipants] = useState([]); 
  const [availableParticipants, setAvailableParticipants] = useState([]); 
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]); 
  
  
  
  
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  // 1. Fungsi untuk Fetch Peserta dari API
  const fetchParticipants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/participants'); 
      if (response.status === 401) {
        router.push('/login'); 
        return;
      }
      if (!response.ok) {
        throw new Error('Gagal mengambil data peserta');
      }
      const data = await response.json();
      setAllParticipants(data || []); 
      
      setAvailableParticipants(data || []); 
    } catch (err) {
      console.error("Fetch participants error:", err);
      setError(err.message);
      setAllParticipants([]);
      setAvailableParticipants([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]); 

  
  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]); 

  // 2. Fungsi Fetch Events untuk FullCalendar
  const fetchCalendarEvents = async (fetchInfo) => {
    
    const startDate = fetchInfo.start.toISOString();
    const endDate = fetchInfo.end.toISOString();
    
    try {
      const response = await fetch(`/api/meetings?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 401) {
        router.push('/login');
        return []; 
      }
      if (!response.ok) {
        throw new Error('Gagal mengambil data rapat');
      }
      const result = await response.json(); 
      const meetingsData = result.data || [];
      
      
      return meetingsData.map(meeting => ({
        id: meeting.id, 
        title: meeting.namaRapat,
        start: meeting.startDateTime, 
        end: meeting.endDateTime,     
        allDay: false, 
        extendedProps: { 
          agenda: meeting.agenda,
          
          participantIds: meeting.participants.map(p => p.participant.id), 
          
          status: meeting.status 
        },
        
        
        
      }));
    } catch (err) {
      console.error("Fetch calendar events error:", err);
      setError(err.message); 
      return []; 
    }
  };
  
  

  const handleDateSelect = (selectInfo) => {
    resetModalFields();
    setSelectedEvent(null); 
    
    const selectedDate = selectInfo.startStr.split('T')[0]; 
    setEventStartDate(selectedDate);
    
    setStartTime("09:00");
    setEndTime("10:00");
    openModal();
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event; 
    
    resetModalFields(); 
    setSelectedEvent(event); 
    
    setEventTitle(event.title);
    
    
    const start = new Date(event.startStr); 
    const end = new Date(event.endStr || event.startStr);

    setEventStartDate(start.toISOString().split('T')[0]);
    setStartTime(start.toISOString().split('T')[1].substring(0, 5));
    setEndTime(end.toISOString().split('T')[1].substring(0, 5));
    
    
    setEventAgenda(event.extendedProps.agenda || "");
    const participantIds = event.extendedProps.participantIds || [];
    setSelectedParticipantIds(participantIds);
    
    
    setAvailableParticipants(allParticipants.filter(p => !participantIds.includes(p.id)));

    openModal();
  };

  const handleParticipantSelect = (event) => {
    const selectedId = event.target.value; 
    if (selectedId && !selectedParticipantIds.includes(selectedId)) {
      const newSelectedIds = [...selectedParticipantIds, selectedId];
      setSelectedParticipantIds(newSelectedIds);
      
      setAvailableParticipants(allParticipants.filter(p => !newSelectedIds.includes(p.id)));
    }
     
    event.target.value = "";
  };

  const handleRemoveParticipant = (participantIdToRemove) => {
    const newSelectedIds = selectedParticipantIds.filter((id) => id !== participantIdToRemove);
    setSelectedParticipantIds(newSelectedIds);
    
    setAvailableParticipants(
      allParticipants.filter(p => !newSelectedIds.includes(p.id)).sort((a, b) => a.nama.localeCompare(b.nama))
    );
  };

  // 3. Fungsi untuk Menambah/Update Event ke API
  const handleAddOrUpdateEvent = async () => {
    if (!eventStartDate || !startTime || !endTime || !eventTitle) {
      alert("Harap isi Nama Rapat, Tanggal, Waktu Mulai, dan Waktu Selesai.");
      return;
    }

    setIsLoading(true); 
    setError(null);

    
    
    const fullStartDate = `${eventStartDate}T${startTime}:00`;
    const fullEndDate = `${eventStartDate}T${endTime}:00`; 

    const eventPayload = {
      namaRapat: eventTitle,
      startDateTime: new Date(fullStartDate).toISOString(), 
      endDateTime: new Date(fullEndDate).toISOString(),     
      agenda: eventAgenda,
      participantIds: selectedParticipantIds, 
    };

    let response;
    try {
      if (selectedEvent && selectedEvent.id) {
        
        response = await fetch(`/api/meetings/${selectedEvent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload),
        });
      } else {
        
        response = await fetch('/api/meetings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload),
        });
      }

      if (response.status === 401) {
        router.push('/login');
        return; 
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Gagal ${selectedEvent ? 'memperbarui' : 'menambah'} rapat`);
      }

      
      closeModal();
      resetModalFields();
      
      if (calendarRef.current) {
        calendarRef.current.getApi().refetchEvents();
      }
      alert(`Rapat berhasil ${selectedEvent ? 'diperbarui' : 'ditambahkan'}!`);

    } catch (err) {
      console.error("Save event error:", err);
      setError(err.message);
      alert(`Error: ${err.message}`); 
    } finally {
      setIsLoading(false); 
    }
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventAgenda("");
    setStartTime("");
    setEndTime("");
    setSelectedParticipantIds([]); 
    setAvailableParticipants([...allParticipants].sort((a, b) => a.nama.localeCompare(b.nama))); 
    setSelectedEvent(null);
    setError(null); 
  };
  
  
  const getParticipantName = (id) => {
      const participant = allParticipants.find(p => p.id === id);
      return participant ? participant.nama : 'Unknown';
  };

  return (
    
    <div className="calendar-container rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"> 
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {isLoading && <div className="text-center p-4">Loading...</div>} {}
      
      <div className="custom-calendar"> {}
        <FullCalendar
          key={allParticipants.length} 
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today addEventButton", 
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          buttonText={{
            today: "Hari Ini",
            dayGridMonth: "Bulan",
            timeGridWeek: "Minggu",
            timeGridDay: "Hari"
          }}
          
          events={fetchCalendarEvents} 
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "+ Tambah Rapat",
              click: () => {
                resetModalFields();
                setSelectedEvent(null);
                
                if (!eventStartDate) {
                  setEventStartDate(new Date().toISOString().split('T')[0]);
                  setStartTime("09:00");
                  setEndTime("10:00");
                }
                openModal();
              },
            }
          }}
          editable={false} 
          locale={'id'} 
          firstDay={1} 
          timeZone={'local'} 
        />
        
        {}
        <Modal
          isOpen={isOpen}
          
          onClose={() => { closeModal(); resetModalFields(); }} 
          className="max-w-[700px] p-6 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl" 
        >
          <div className="flex flex-col px-2 overflow-y-auto max-h-[80vh] custom-scroll"> {}
            <div>
              <h5 className="mb-2 text-gray-900 dark:text-white text-lg font-semibold modal-title">
                {selectedEvent ? "Edit Rapat" : "Tambah Rapat Baru"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Silahkan masukkan informasi rapat
              </p>
            </div>
            <div className="mt-8 space-y-6"> {}
              {/* Nama Rapat */}
              <div>
                <label htmlFor="event-title" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nama Rapat <span className="text-red-500">*</span>
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                  className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              {/* Agenda Rapat */}
              <div>
                <label htmlFor="event-agenda" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Agenda Rapat
                </label>
                <textarea
                  id="event-agenda"
                  value={eventAgenda}
                  onChange={(e) => setEventAgenda(e.target.value)}
                  rows={3}
                  className="modal-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              {/* Peserta Rapat */}
              <div>
                <label htmlFor="participant-select" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Peserta Rapat
                </label>
                <select
                  id="participant-select"
                  onChange={handleParticipantSelect}
                  value="" 
                  className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="" disabled> -- Pilih Peserta -- </option>
                  {}
                  {availableParticipants.map((participant) => (
                    <option key={participant.id} value={participant.id}>{participant.nama}</option>
                  ))}
                </select>
                {/* Tampilkan peserta terpilih */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedParticipantIds.map((id) => (
                    <div
                      key={id}
                      className="inline-flex items-center space-x-1 py-1 px-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      <span>{getParticipantName(id)}</span> {}
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(id)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 font-bold text-sm"
                        aria-label={`Hapus ${getParticipantName(id)}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tanggal Rapat */}
              <div>
                <label htmlFor="event-start-date" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Tanggal Rapat <span className="text-red-500">*</span>
                </label>
                <input
                  id="event-start-date"
                  type="date"
                  value={eventStartDate}
                  required
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              {/* Waktu Mulai & Selesai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start-time" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Waktu Mulai <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="start-time"
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="end-time" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Waktu Selesai <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="end-time"
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
            {/* Tombol Aksi Modal */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 modal-footer sm:justify-end">
              <button
                onClick={() => { closeModal(); resetModalFields(); }}
                type="button"
                disabled={isLoading} 
                className="modal-footer-button modal-footer-close flex w-full justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 sm:w-auto disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                disabled={isLoading} 
                className="modal-footer-button modal-footer-action flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Menyimpan...' : (selectedEvent ? "Simpan Perubahan" : "Tambah Rapat")}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};


const renderEventContent = (eventInfo) => {
  
  const status = eventInfo.event.extendedProps.status;
  let bgColor = 'bg-blue-500'; // Default AKTIF
  if (status === 'SELESAI') bgColor = 'bg-green-500';
  if (status === 'ARSIP') bgColor = 'bg-gray-500';

  return (
    <div className={`p-1 rounded-sm text-xs text-white ${bgColor} border border-blue-600 overflow-hidden`}> {}
      <div className="fc-event-title font-semibold truncate">{eventInfo.event.title}</div>
      {}
      {eventInfo.view.type !== 'dayGridMonth' && (
         <div className="text-xs opacity-90">
           {eventInfo.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - 
           {eventInfo.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
         </div>
      )}
      {/* Tampilkan agenda singkat jika ada */}
      {eventInfo.event.extendedProps.agenda && <div className="text-xs opacity-80 truncate mt-1">{eventInfo.event.extendedProps.agenda}</div>}
    </div>
  );
};

export default Calendar;