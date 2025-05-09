
import prisma from '@/lib/prisma';
import { formatISO } from 'date-fns';
import { authenticate } from '@/lib/authMiddleware'; 

async function handler(req, res) { 

  if (req.method === 'GET') {
    
    try {
      
      const now = new Date();
      await prisma.meeting.updateMany({
        where: {
          status: 'AKTIF',
          endDateTime: { lt: now },
        },
        data: { status: 'SELESAI' },
      });

      const { status, searchNamaRapat, sortBy = 'startDateTime', order = 'desc', page = 1, limit = 10 } = req.query;
      
      const whereClause = {};
      if (status) {
        const statusArray = status.split(',');
        if (statusArray.length > 0) whereClause.status = { in: statusArray.filter(s => s) }; 
      }
      if (searchNamaRapat) {
        whereClause.namaRapat = { contains: searchNamaRapat, mode: 'insensitive' };
      }

      const meetings = await prisma.meeting.findMany({
        where: whereClause,
        include: {
          participants: { include: { participant: { select: { id: true, nama: true }}}},
          documents: { select: { id: true, namaFile: true, pathFile: true } }, 
        },
        orderBy: { [sortBy]: order },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });
      const totalMeetings = await prisma.meeting.count({ where: whereClause });

      const formattedMeetings = meetings.map(m => ({
        ...m,
        startDateTime: formatISO(new Date(m.startDateTime)),
        endDateTime: formatISO(new Date(m.endDateTime)),
      }));
      
      res.status(200).json({ 
        data: formattedMeetings, 
        totalPages: Math.ceil(totalMeetings / Number(limit)),
        currentPage: Number(page),
        totalItems: totalMeetings,
      });

    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

  } else if (req.method === 'POST') {
    
    
    try {
      const { namaRapat, startDateTime, endDateTime, agenda, participantIds = [] } = req.body;

      if (!namaRapat || !startDateTime || !endDateTime) {
        return res.status(400).json({ message: 'Field wajib: namaRapat, startDateTime, endDateTime' });
      }
      
      const newMeeting = await prisma.meeting.create({
        data: {
          namaRapat,
          startDateTime: new Date(startDateTime),
          endDateTime: new Date(endDateTime),
          agenda,
          status: 'AKTIF',
          participants: {
            create: participantIds.map(pId => ({
              participant: { connect: { id: pId } },
            })),
          },
          
          
        },
        include: { participants: { include: { participant: true }}}
      });
      res.status(201).json({
        ...newMeeting,
        startDateTime: formatISO(new Date(newMeeting.startDateTime)),
        endDateTime: formatISO(new Date(newMeeting.endDateTime)),
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      if (error.code === 'P2025') {
         return res.status(400).json({ message: 'Error: Salah satu ID peserta tidak ditemukan.', details: error.meta });
      }
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler); 