import { useState, useCallback, memo } from 'react';
import { User } from 'lucide-react';

const SelectCell = memo(({
  value,
  onChange,
  mahasiswaId,
  aspekId
}: {
  value: number;
  onChange: (mahasiswaId: number, aspekId: number, value: number) => void;
  mahasiswaId: number;
  aspekId: number;
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(mahasiswaId, aspekId, parseInt(e.target.value));
  }, [mahasiswaId, aspekId, onChange]);

  return (
    <select
      value={value}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
  );
});

SelectCell.displayName = 'SelectCell';

function App() {
  const [grades, setGrades] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (let aspek = 1; aspek <= 4; aspek++) {
      for (let mhs = 1; mhs <= 10; mhs++) {
        initial[`${aspek}_${mhs}`] = aspek === 1 || aspek === 1 ? (aspek === 1 ? 1 : 1) : (aspek === 3 ? 1 : 1);
      }
    }
    return initial;
  });

  const handleGradeChange = useCallback((mahasiswaId: number, aspekId: number, value: number) => {
    setGrades(prev => ({
      ...prev,
      [`${aspekId}_${mahasiswaId}`]: value
    }));
  }, []);

  const handleSimpan = useCallback(() => {
    const output: Record<string, Record<string, number>> = {};

    for (let aspek = 1; aspek <= 4; aspek++) {
      output[`aspek_penilaian_${aspek}`] = {};
      for (let mhs = 1; mhs <= 10; mhs++) {
        output[`aspek_penilaian_${aspek}`][`mahasiswa_${mhs}`] = grades[`${aspek}_${mhs}`];
      }
    }

    console.log(JSON.stringify(output, null, 2));
    alert('Output telah disimpan. Lihat console untuk hasilnya.');
  }, [grades]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Aplikasi Penilaian Mahasiswa
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold w-48"></th>
                  {[1, 2, 3, 4].map(aspek => (
                    <th key={aspek} className="px-4 py-4 text-center text-gray-700 font-semibold">
                      <div>Aspek</div>
                      <div>penilaian {aspek}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mhs, index) => (
                  <tr key={mhs} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-700">Mahasiswa {mhs}</span>
                      </div>
                    </td>
                    {[1, 2, 3, 4].map(aspek => (
                      <td key={aspek} className="px-4 py-4 border-b border-gray-200">
                        <SelectCell
                          value={grades[`${aspek}_${mhs}`]}
                          onChange={handleGradeChange}
                          mahasiswaId={mhs}
                          aspekId={aspek}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSimpan}
            className="px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
