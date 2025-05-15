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
import CustomTimePicker from "./custom-time-picker";
import CustomDatePicker from "./custom-date-picker";
import Swal from 'sweetalert2';



const Calendar = () => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [eventTitle, setEventTitle] = useState("");
  const [eventAgenda, setEventAgenda] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  
  const [allUsers, setAllUsers] = useState([]); 
  const [availableUsers, setAvailableUsers] = useState([]); 
  const [selectedUserIds, setSelectedUserIds] = useState([]); 
  
  
  
  
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  // 1. Fungsi untuk Fetch User dari API
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users'); 
      if (response.status === 401) {
        router.push('/sign-in'); 
        return;
      }
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }
      const data = await response.json();
      setAllUsers(data || []); 
      
      setAvailableUsers(data || []); 
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message);
      setAllUsers([]);
      setAvailableUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]); 

  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  // 2. Fungsi Fetch Events untuk FullCalendar
  const fetchCalendarEvents = async (fetchInfo) => {
    
    const startDate = fetchInfo.start.toISOString();
    const endDate = fetchInfo.end.toISOString();
    
    try {
      const response = await fetch(`/api/meetings?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 401) {
        router.push('/sign-in');
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
          
          userIds: meeting.participants.map(p => p.user.id), 
          
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
    const userIds = event.extendedProps.userIds || [];
    setSelectedUserIds(userIds);
    
    
    setAvailableUsers(allUsers.filter(u => !userIds.includes(u.id)));

    openModal();
  };

  const handleUserSelect = (event) => {
    const selectedId = event.target.value; 
    if (selectedId && !selectedUserIds.includes(selectedId)) {
      const newSelectedIds = [...selectedUserIds, selectedId];
      setSelectedUserIds(newSelectedIds);
      
      setAvailableUsers(allUsers.filter(u => !newSelectedIds.includes(u.id)));
    }
     
    event.target.value = "";
  };

  const handleRemoveUser = (userIdToRemove) => {
    const newSelectedIds = selectedUserIds.filter((id) => id !== userIdToRemove);
    setSelectedUserIds(newSelectedIds);
    
    setAvailableUsers(
      allUsers.filter(u => !newSelectedIds.includes(u.id)).sort((a, b) => a.nama.localeCompare(b.nama))
    );
  };

  // 3. Fungsi untuk Menambah/Update Event ke API
  const handleAddOrUpdateEvent = async () => {
    if (!eventStartDate || !startTime || !endTime || !eventTitle) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Belum Lengkap',
        text: 'Harap isi Nama Rapat, Tanggal, Waktu Mulai, dan Waktu Selesai.',
        confirmButtonColor: '#3085d6',
      });
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
      userIds: selectedUserIds, 
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
        router.push('/sign-in');
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
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: `Rapat berhasil ${selectedEvent ? 'diperbarui' : 'ditambahkan'}!`,
        confirmButtonColor: '#3085d6',
      });

    } catch (err) {
      console.error("Save event error:", err);
      setError(err.message);
      
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: `Error: ${err.message}`,
        confirmButtonColor: '#3085d6',
      });
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
    setSelectedUserIds([]); 
    setAvailableUsers([...allUsers].sort((a, b) => a.nama.localeCompare(b.nama))); 
    setSelectedEvent(null);
    setError(null); 
  };
  
  
  const getUserName = (id) => {
      const user = allUsers.find(u => u.id === id);
      return user ? user.nama : 'Unknown';
  };

  return (
    
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 flex flex-col h-full"> 
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      
      <div className="custom-calendar flex-1 relative min-h-0"> {}
        {isLoading && 
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <div role="status" className="mb-4">
                <svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Memuat data kalender...</p>
            </div>
          </div>
        }
        <FullCalendar
          key={allUsers.length} 
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next addEventButton", 
            center: "title",
            right: "dayGridMonth"
          }}
          buttonText={{
            dayGridMonth: "Bulan",
          }}
          
          events={fetchCalendarEvents} 
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "Tambah Rapat",
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
                <label htmlFor="user-select" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Peserta Rapat
                </label>
                <select
                  id="user-select"
                  onChange={handleUserSelect}
                  value="" 
                  className="modal-input h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="" disabled> -- Pilih Peserta -- </option>
                  {}
                  {availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>{user.nama}</option>
                  ))}
                </select>
                {/* Tampilkan peserta terpilih */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedUserIds.map((id) => (
                    <div
                      key={id}
                      className="inline-flex items-center space-x-1 py-1 px-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      <span>{getUserName(id)}</span> {}
                      <button
                        type="button"
                        onClick={() => handleRemoveUser(id)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 font-bold text-sm"
                        aria-label={`Hapus ${getUserName(id)}`}
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
                <CustomDatePicker
                  idPrefix="event-start-date"
                  value={eventStartDate}
                  onChange={setEventStartDate}
                />
              </div>
              {/* Waktu Mulai & Selesai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start-time-picker" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Waktu Mulai <span className="text-red-500">*</span>
                  </label>
                  <CustomTimePicker
                    idPrefix="start"
                    value={startTime}
                    onChange={setStartTime}
                  />
                </div>
                <div>
                  <label htmlFor="end-time-picker" className="modal-label mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Waktu Selesai <span className="text-red-500">*</span>
                  </label>
                  <CustomTimePicker
                    idPrefix="end"
                    value={endTime}
                    onChange={setEndTime}
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
  let bgColor = 'bg-blue-500'; 
  if (status === 'SELESAI') bgColor = 'bg-green-500';
  if (status === 'ARSIP') bgColor = 'bg-gray-500';

  return (
    <div className={`p-1 rounded-sm text-xs text-white ${bgColor} border border-blue-600 overflow-hidden`}> {}
      <div className="fc-event-title font-semibold truncate">{eventInfo.event.title}</div>
    </div>
  );
};

export default Calendar;