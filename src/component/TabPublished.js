import { useEffect, useState } from 'react';

const TabPublished = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/checklist')
      .then((response) => response.json())
      .then((data) => {
        console.log("Data dari API:", data); 
        if (Array.isArray(data.checklists)) {
          setMeetings(data.checklists); 
        } else {
          console.error('Data tidak sesuai format yang diharapkan:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching meetings:', error)
      );
  }, []);

  return (
    <div>
      <h2>Data Meeting</h2>
      <table border="1">
        <thead>
          <tr>
            <th>No</th>
            <th>Unit</th>
            <th>Ruang Meeting</th>
            <th>Tanggal Rapat</th>
            <th>Waktu Mulai</th>
            <th>Waktu Selesai</th>
            <th>Jumlah Peserta</th>
            <th>Jenis Konsumsi</th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting, index) => (
              <tr key={meeting.id}>
                <td>{index + 1}</td>
                <td>{meeting.unit}</td>
                <td>{meeting.ruang_meeting}</td>
                <td>{new Date(meeting.tanggal_rapat).toLocaleDateString('id-ID')}</td>
                <td>{meeting.waktu_mulai}</td>
                <td>{meeting.waktu_selesai}</td>
                <td>{meeting.jumlah_peserta}</td>
                <td>{meeting.jenis_konsumsi}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Tidak ada data yang tersedia.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPublished;
