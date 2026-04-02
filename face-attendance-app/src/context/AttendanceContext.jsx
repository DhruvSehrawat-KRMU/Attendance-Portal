import { createContext, useContext, useState, useEffect } from 'react';

const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  const [registeredFaces, setRegisteredFaces] = useState(() => {
    const saved = localStorage.getItem('registeredFaces');
    return saved ? JSON.parse(saved) : [];
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem('attendanceRecords');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('registeredFaces', JSON.stringify(registeredFaces));
  }, [registeredFaces]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const registerFace = (name, descriptor) => {
    const newFace = {
      id: Date.now().toString(),
      name,
      descriptor: Array.from(descriptor),
      registeredAt: new Date().toISOString(),
    };
    setRegisteredFaces((prev) => [...prev, newFace]);
    return newFace;
  };

  const removeFace = (id) => {
    setRegisteredFaces((prev) => prev.filter((f) => f.id !== id));
  };

  const markAttendance = (personId, personName) => {
    const today = new Date().toDateString();
    const alreadyMarked = attendanceRecords.find(
      (r) => r.personId === personId && new Date(r.timestamp).toDateString() === today
    );
    if (alreadyMarked) return null;

    const record = {
      id: Date.now().toString(),
      personId,
      personName,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'present',
    };
    setAttendanceRecords((prev) => [record, ...prev]);
    return record;
  };

  const clearAttendance = () => {
    setAttendanceRecords([]);
  };

  const getTodayAttendance = () => {
    const today = new Date().toDateString();
    return attendanceRecords.filter(
      (r) => new Date(r.timestamp).toDateString() === today
    );
  };

  return (
    <AttendanceContext.Provider
      value={{
        registeredFaces,
        attendanceRecords,
        registerFace,
        removeFace,
        markAttendance,
        clearAttendance,
        getTodayAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
}
