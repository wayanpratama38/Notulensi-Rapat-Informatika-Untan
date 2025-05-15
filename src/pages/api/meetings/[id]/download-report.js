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
      // Header tabel
      [
        { text: 'No', style: 'tableHeader' },
        { text: 'Nama Peserta', style: 'tableHeader' },
        { text: 'Tanda Tangan', style: 'tableHeader' }
      ],
      
      // Data peserta
      ...(meeting.participants?.map((mp, index) => {
        let signatureContent = { text: '(Tidak Ada)', italics: true, alignment: 'center', fontSize: 9 };
        
        if (mp.user?.tandaTangan) {
          const signaturePathFromDB = mp.user.tandaTangan;
          console.log(`Processing signature for ${mp.user.nama}. Path from DB: "${signaturePathFromDB}"`)
          
          // Convert tandaTangan file path ke data URL untuk PDF
          const signatureDataUrl = imagePathToDataUrl(signaturePathFromDB);
          if (signatureDataUrl) {
            signatureContent = { image: signatureDataUrl, width: 80, alignment: 'center' }; 
          } else {
            signatureContent = { text: '[Gagal Load TTD]', color: 'red', alignment: 'center', fontSize: 9 };
          }
        }
        return [
          { text: (index + 1).toString(), alignment: 'center' },
          { text: mp.user?.nama || 'N/A', alignment: 'left' },
          signatureContent
        ];
      }) || [
        // Fallback jika tidak ada peserta
        [{ text: 'Tidak ada data peserta.', colSpan: 3, alignment: 'center', italics: true }]
      ])
    ];

    
    const documentationContent = [];
    if (meeting.documents && meeting.documents.length > 0) {
      // Buat array untuk menyimpan item dokumentasi
      const docItems = [];
      
      // Proses setiap dokumen
      meeting.documents.forEach(doc => {
        const docItem = {};
        
        if (doc.tipeFile?.startsWith('image/')) {
          const docDataUrl = imagePathToDataUrl(doc.pathFile); 
          if (docDataUrl) {
             docItem.image = docDataUrl;
             docItem.width = 150; // Ukuran lebih kecil untuk grid
             docItem.caption = doc.namaFile || 'Dokumen Gambar';
          } else {
             docItem.text = `[Gagal memuat gambar: ${doc.namaFile || 'Unknown'}]`;
             docItem.color = 'red';
          }
        } else {
          docItem.text = `Dokumen: ${doc.namaFile || 'Unknown'} (${doc.tipeFile || 'Unknown type'})`;
        }
        
        docItems.push(docItem);
      });
      
      
      
      // Buat array untuk menyimpan baris tabel
      const tableRows = [];
      
      // Buat baris-baris tabel (maksimal 3 baris)
      for (let i = 0; i < Math.min(3, Math.ceil(docItems.length / 2)); i++) {
        const row = [];
        
        // Kolom 1
        const idx1 = i * 2;
        if (idx1 < docItems.length) {
          const item1 = docItems[idx1];
          if (item1.image) {
            row.push({
              stack: [
                { image: item1.image, width: item1.width, alignment: 'center' },
                { text: item1.caption, fontSize: 8, italics: true, alignment: 'center', marginTop: 5 }
              ],
              margin: [0, 0, 5, 10]
            });
          } else {
            row.push({
              text: item1.text,
              fontSize: 9,
              color: item1.color || 'black',
              margin: [0, 0, 5, 10]
            });
          }
        } else {
          row.push(''); // Sel kosong
        }
        
        // Kolom 2
        const idx2 = i * 2 + 1;
        if (idx2 < docItems.length) {
          const item2 = docItems[idx2];
          if (item2.image) {
            row.push({
              stack: [
                { image: item2.image, width: item2.width, alignment: 'center' },
                { text: item2.caption, fontSize: 8, italics: true, alignment: 'center', marginTop: 5 }
              ],
              margin: [5, 0, 0, 10]
            });
          } else {
            row.push({
              text: item2.text,
              fontSize: 9,
              color: item2.color || 'black',
              margin: [5, 0, 0, 10]
            });
          }
        } else {
          row.push(''); // Sel kosong
        }
        
        tableRows.push(row);
      }
      
      // Tambahkan tabel ke konten dokumentasi
      documentationContent.push({
        table: {
          widths: ['*', '*'],
          body: tableRows
        },
        layout: 'noBorders'
      });
      
    } else {
      documentationContent.push({ text: 'Tidak ada dokumentasi terlampir.', style: 'paragraph', italics: true, marginTop: 15 });
    }

    
    let docDefinition = {
      pageSize: 'A4',
      pageMargins: [ 40, 60, 40, 60 ],

      footer: function(currentPage, pageCount) {
        return { text: `Halaman ${currentPage.toString()} dari ${pageCount}`, alignment: 'center', fontSize: 9, margin: [0, 0, 0, 30] };
      },

      content: [
        { text: 'NOTULENSI RAPAT', style: 'header', alignment: 'center' },
        { text: meeting.namaRapat || '(Nama Rapat Tidak Ditentukan)', style: 'subheader', alignment: 'center', marginBottom: 20 },

        {
          style: 'infoTable',
          table: {
            widths: [100, '*'],
            body: [
              [{text: 'Tanggal', bold: true}, `: ${formatDate(meeting.startDateTime)}`],
              [{text: 'Waktu', bold: true}, `: ${formatTime(meeting.startDateTime)} - ${formatTime(meeting.endDateTime)} WIB`],
              [{text: 'Agenda', bold: true}, {text: `: ${meeting.agenda}`}],
            ]
          },
          layout: 'noBorders'
        },

        { text: 'Hasil Rapat:', style: 'sectionHeader' },
        { text: meeting.notulensiRapat || '(Tidak ada notulensi tercatat)', style: 'paragraph', marginBottom: 20, italics: !meeting.notulensiRapat },

        { text: 'Daftar Hadir Peserta:', style: 'sectionHeader', pageBreak:"before", marginBottom: 10 },
        {
          style: 'dataTable',
          table: {
            headerRows: 1,
            widths: [30, '*', 150],
            body: participantTableBody
          },
          layout: { 
             hLineWidth: (i, node) => 1,
             vLineWidth: (i, node) => 1,
             hLineColor: (i, node) => (i === 0 || i === 1 || i === node.table.body.length) ? '#AAAAAA' : '#DDDDDD',
             vLineColor: (i, node) => '#AAAAAA',
             paddingLeft: (i, node) => 8,
             paddingRight: (i, node) => 8,
             paddingTop: (i, node) => 6, 
             paddingBottom: (i, node) => 6
          }
        },

        (documentationContent.length > 1 || (documentationContent.length === 1 && !documentationContent[0].text?.includes('Tidak ada dokumentasi')))
          ? { text: 'Dokumentasi:', style: 'sectionHeader', pageBreak: 'before', marginBottom: 10 }
          : null, 
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