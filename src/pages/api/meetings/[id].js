
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import { formatISO } from 'date-fns';

async function handler(req, res) {
  const { id: meetingId } = req.query; 

  if (req.method === 'GET') {
    try {
      const meeting = await prisma.meeting.findUnique({
        where: { id: meetingId },
        include: { 
          participants: { include: { participant: true } },
          documents: true,
        }
      });
      if (!meeting) {
        return res.status(404).json({ message: 'Rapat tidak ditemukan' });
      }
      
      res.status(200).json({
        ...meeting,
        startDateTime: formatISO(new Date(meeting.startDateTime)),
        endDateTime: formatISO(new Date(meeting.endDateTime)),
      });
    } catch (error) {
      console.error(`Error fetching meeting ${meetingId}:`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { namaRapat, startDateTime, endDateTime, agenda, participantIds } = req.body;
      
      const updatedMeeting = await prisma.meeting.update({
        where: { id: meetingId },
        data: {
          namaRapat,
          startDateTime: new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          agenda,
          
          
        },
        include: { participants: { include: { participant: true }}}
      });
       res.status(200).json({
        ...updatedMeeting,
        startDateTime: formatISO(new Date(updatedMeeting.startDateTime)),
        endDateTime: formatISO(new Date(updatedMeeting.endDateTime)),
      });
    } catch (error) {
       console.error(`Error updating meeting ${meetingId}:`, error);
       res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.meeting.delete({ where: { id: meetingId } });
      res.status(200).json({ message: 'Rapat berhasil dihapus' });
    } catch (error) {
      console.error(`Error deleting meeting ${meetingId}:`, error);
      if (error.code === 'P2025') { 
          return res.status(404).json({ message: 'Rapat tidak ditemukan' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 