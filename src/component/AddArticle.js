import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const [unit, setUnit] = useState('');
  const [ruang_meeting, setRuangMeeting] = useState('');
  const [tanggal_rapat, setTanggalRapat] = useState('');
  const [waktu_mulai, setWaktuMulai] = useState('');
  const [waktu_selesai, setWaktuSelesai] = useState('');
  const [jumlah_peserta, setJumlahPeserta] = useState('');
  const [jenis_konsumsi, setJenisKonsumsi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/addChecklistItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        unit,
        ruang_meeting,
        tanggal_rapat,
        waktu_mulai,
        waktu_selesai,
        jumlah_peserta,
        jenis_konsumsi,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message); 
        navigate('/'); 
      } else {
        alert('Terjadi kesalahan saat menambahkan artikel.');
      }
    })
    .catch((error) => {
      console.error('Error adding article:', error);
      alert('Gagal menambahkan artikel.'); 
    });
  };

  return (
    <div className="form-add-new">
      <form onSubmit={handleSubmit}>
        <h2>Booking Ruang Rapat</h2>
        <div>
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ruang_meeting">Ruang Meeting</label>
          <input
            type="text"
            id="ruang_meeting"
            value={ruang_meeting}
            onChange={(e) => setRuangMeeting(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tanggal_rapat">Tanggal Rapat</label>
          <input
            type="date"
            id="tanggal_rapat"
            value={tanggal_rapat}
            onChange={(e) => setTanggalRapat(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="waktu_mulai">Waktu Mulai</label>
          <input
            type="time"
            id="waktu_mulai"
            value={waktu_mulai}
            onChange={(e) => setWaktuMulai(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="waktu_selesai">Waktu Selesai</label>
          <input
            type="time"
            id="waktu_selesai"
            value={waktu_selesai}
            onChange={(e) => setWaktuSelesai(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jumlah_peserta">Jumlah Peserta</label>
          <input
            type="text"
            id="jumlah_peserta"
            value={jumlah_peserta}
            onChange={(e) => setJumlahPeserta(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jenis_konsumsi">Jenis Konsumsi</label>
          <input
            type="text"
            id="jenis_konsumsi"
            value={jenis_konsumsi}
            onChange={(e) => setJenisKonsumsi(e.target.value)}
            required
          />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default AddArticle;
