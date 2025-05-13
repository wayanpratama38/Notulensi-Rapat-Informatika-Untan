import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/authMiddleware';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';



const fontsPath = path.join(process.cwd(), 'public/fonts'); 
const fonts = {
  Roboto: {
    normal: path.join(fontsPath, 'Roboto-Regular.ttf'),
    bold: path.join(fontsPath, 'Roboto-Medium.ttf'), 
    italics: path.join(fontsPath, 'Roboto-Italic.ttf'),
    bolditalics: path.join(fontsPath, 'Roboto-MediumItalic.ttf'), 
  }
};
console.log('Absolute Font Path (Normal):', fonts.Roboto.normal);


const imagePathToDataUrl = (filePathRelToPublic) => {
  if (!filePathRelToPublic) return null;
  try {
    
    const absolutePath = path.join(process.cwd(), 'public', filePathRelToPublic);
    console.log(`Attempting to read image: ${absolutePath}`); 
    if (fs.existsSync(absolutePath)) {
      const img = fs.readFileSync(absolutePath);
      const extension = path.extname(filePathRelToPublic).substring(1).toLowerCase();
      let mimeType = `image/${extension}`; 
      if (extension === 'jpg' || extension === 'jpeg') mimeType = 'image/jpeg';
      
      

      return `data:${mimeType};base64,${Buffer.from(img).toString('base64')}`;
    } else {
      console.warn(`Image file not found at: ${absolutePath}`);
      return null; 
    }
  } catch (e) {
    console.error("Error reading image for PDF:", filePathRelToPublic, e);
    return null; 
  }
};


async function handler(req, res) {
  const { id: meetingId } = req.query;

  console.log('Absolute Font Path (Normal):', fonts.Roboto.normal);


  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
      include: {
        participants: {
          include: {
            user: true, 
          },
        },
        documents: true, 
      },
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Rapat tidak ditemukan' });
    }
    
    if (meeting.status !== 'ARSIP') {
      return res.status(400).json({ message: 'Laporan hanya bisa diunduh untuk rapat yang berstatus ARSIP.' });
    }

    const printer = new PdfPrinter(fonts);

    
    const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    const formatTime = (isoString) => isoString ? new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A';

    
    const participantTableBody = [
      
      [
        { text: 'No', style: 'tableHeader' },
        { text: 'Nama Peserta', style: 'tableHeader' },
        { text: 'Tanda Tangan', style: 'tableHeader' }
      ],
      
      ...(meeting.participants?.map((mp, index) => {
        let signatureContent = { text: '(Tidak Ada)', italics: true, alignment: 'center', fontSize: 9 };
        
        if (mp.user?.tandaTangan) {
          const signaturePathFromDB = mp.user.tandaTangan;
          console.log(`Processing signature for ${mp.user.nama}. Path from DB: "${signaturePathFromDB}"`)
          
          
          const signatureDataUrl = imagePathToDataUrl(signaturePathFromDB);
          if (signatureDataUrl) {
            signatureContent = { image: signatureDataUrl, width: 80, alignment: 'center' }; 
          } else {
            signatureContent = { text: '[Gagal Load TTD]', color: 'red', alignment: 'center', fontSize: 9 };
          }
        }
        return [
          (index + 1).toString(),
          mp.user?.nama || 'N/A',
          signatureContent
        ];
      }) || [
        
        [{ text: 'Tidak ada data peserta.', colSpan: 4, alignment: 'center', italics: true }]
      ])
    ];

    
    const documentationContent = [];
    if (meeting.documents && meeting.documents.length > 0) {
      meeting.documents.forEach(doc => {
        if (doc.tipeFile?.startsWith('image/')) {
          
          
          const docDataUrl = imagePathToDataUrl(doc.pathFile); 
          if (docDataUrl) {
             documentationContent.push({ image: docDataUrl, width: 450, alignment: 'center', marginTop: 15 }); 
             documentationContent.push({ text: doc.namaFile || 'Dokumen Gambar', fontSize: 9, italics: true, alignment: 'center', marginBottom: 10 });
          } else {
             documentationContent.push({text: `[Gagal memuat gambar: ${doc.namaFile || 'Unknown'}]`, style:'paragraph', color: 'red', marginTop: 15});
          }
        } else {
          documentationContent.push({ text: `Dokumen Terlampir: ${doc.namaFile || 'Unknown'} (${doc.tipeFile || 'Unknown type'})`, style: 'paragraph', marginTop: 15 });
        }
      });
    } else {
      documentationContent.push({ text: 'Tidak ada dokumentasi terlampir.', style: 'paragraph', italics: true, marginTop: 15 });
    }

    
    let docDefinition = {
      pageSize: 'A4',
      pageMargins: [ 40, 60, 40, 60 ],

      
      header: { text: 'Notulensi Rapat - Internal Use Only', alignment: 'right', fontSize: 9, margin: [0, 30, 40, 0] },

      
      footer: function(currentPage, pageCount) {
        return { text: `Halaman ${currentPage.toString()} dari ${pageCount}`, alignment: 'center', fontSize: 9, margin: [0, 0, 0, 30] };
      },


      // Konten Utama
      content: [
        { text: 'NOTULENSI RAPAT', style: 'header', alignment: 'center' },
        { text: meeting.namaRapat || '(Nama Rapat Tidak Ditentukan)', style: 'subheader', alignment: 'center', marginBottom: 20 },

        // Tabel Informasi Dasar
        {
          style: 'infoTable',
          table: {
            widths: ['auto', '*'],
            body: [
              [{text: 'Tanggal', bold: true}, `: ${formatDate(meeting.startDateTime)}`],
              [{text: 'Waktu', bold: true}, `: ${formatTime(meeting.startDateTime)} - ${formatTime(meeting.endDateTime)} WIB`],
              [{text: 'Agenda', bold: true}, {text: `: ${meeting.agenda || '-'}`}], // Wrap isi agenda
              [{text: 'Status', bold: true}, `: ${meeting.status || 'N/A'}`]
            ]
          },
          layout: 'noBorders'
        },

        // Isi Notulensi
        { text: 'Hasil Pembahasan / Notulensi:', style: 'sectionHeader' },
        { text: meeting.notulensiRapat || '(Tidak ada notulensi tercatat)', style: 'paragraph', marginBottom: 20, italics: !meeting.notulensiRapat },

        // Daftar Hadir Peserta
        { text: 'Daftar Hadir Peserta:', style: 'sectionHeader' },
        {
          style: 'dataTable',
          table: {
            headerRows: 1,
            // Sesuaikan lebar kolom untuk 4 kolom (No, Nama, Email, TTD)
            widths: [25, '*', 150, 85],
            body: participantTableBody // Gunakan body tabel yang sudah dibuat
          },
          layout: { // Style garis tabel
             hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 1 : 1,
             vLineWidth: (i, node) => (i === 0 || i === node.table.widths.length) ? 1 : 0,
             hLineColor: (i, node) => (i === 0 || i === 1 || i === node.table.body.length) ? '#AAAAAA' : '#DDDDDD', // Abu-abu
             vLineColor: (i, node) => (i === 0 || i === node.table.widths.length) ? '#AAAAAA' : '#DDDDDD',
             paddingLeft: (i, node) => 5, paddingRight: (i, node) => 5,
             paddingTop: (i, node) => 4, paddingBottom: (i, node) => 4
          }
        },

        // Dokumentasi (di halaman baru jika ada)
        (documentationContent.length > 1 || (documentationContent.length === 1 && !documentationContent[0].text?.includes('Tidak ada dokumentasi')))
          ? { text: 'Dokumentasi:', style: 'sectionHeader', pageBreak: 'before', marginBottom: 10 }
          : null, // Jangan tampilkan header jika tidak ada dokumentasi
        ...documentationContent
      ].filter(Boolean), 
      

      styles: {
        header: { fontSize: 16, bold: true, marginBottom: 10 },
        subheader: { fontSize: 14, bold: true, marginBottom: 5 },
        sectionHeader: { fontSize: 12, bold: true, marginTop: 15, marginBottom: 8 },
        paragraph: { fontSize: 10, lineHeight: 1.4 },
        infoTable: { fontSize: 10, margin: [0, 0, 0, 15] },
        dataTable: { fontSize: 9, margin: [0, 5, 0, 15] }, 
        tableHeader: { bold: true, fontSize: 10, color: 'black', fillColor: '#EAEAEA', alignment: 'center' }
      },

      defaultStyle: {
        font: 'Roboto', 
        fontSize: 11,
        lineHeight: 1.3,
      }
    };
    // --- Generate dan Kirim PDF ---
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const filename = `Laporan_Rapat_${(meeting.namaRapat || 'Meeting').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Streaming langsung ke response
    pdfDoc.pipe(res);
    pdfDoc.end();

  } catch (error) {
    console.error("Error in PDF generation API:", error);
    
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error saat membuat PDF', error: error.message });
    } else {
      
      console.error("Error occurred after response headers were sent during PDF generation.");
    }
  }
}

export default authenticate(handler);