// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]); // State untuk catatan
  const [namaPelajaran, setNamaPelajaran] = useState("");
  const [namaDosen, setNamaDosen] = useState("");
  const [namaTugas, setNamaTugas] = useState("");
  const [deadline, setDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State untuk role pengguna
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsAdmin(user.email === "admin@gmail.com");
    }

    const unsubscribeTasks = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    const unsubscribeNotes = onSnapshot(collection(db, "notes"), (snapshot) => {
      const noteList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(noteList); // Mengatur state catatan
    });

    return () => {
      unsubscribeTasks();
      unsubscribeNotes();
    };
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk menambahkan tugas.");
      return;
    }

    try {
      if (editingTaskId) {
        await updateDoc(doc(db, "tasks", editingTaskId), {
          namaPelajaran,
          namaDosen,
          namaTugas,
          deadline,
        });
        setEditingTaskId(null);
        toast.success("Tugas berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "tasks"), {
          namaPelajaran,
          namaDosen,
          namaTugas,
          deadline,
        });
        toast.success("Tugas berhasil ditambahkan!");
      }
      setNamaPelajaran("");
      setNamaDosen("");
      setNamaTugas("");
      setDeadline("");
    } catch (err) {
      toast.error("Gagal menambahkan atau memperbarui tugas: " + err.message);
    }
  };

  const handleEditTask = (task) => {
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk mengedit tugas.");
      return;
    }
    setEditingTaskId(task.id);
    setNamaPelajaran(task.namaPelajaran);
    setNamaDosen(task.namaDosen);
    setNamaTugas(task.namaTugas);
    setDeadline(task.deadline);
  };

  const handleDeleteTask = async (taskId) => {
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk menghapus tugas.");
      return;
    }
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      toast.success("Tugas berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus tugas: " + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        await updateDoc(doc(db, "notes", editingNoteId), {
          content: noteContent,
        });
        setEditingNoteId(null);
        toast.success("Catatan berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "notes"), {
          content: noteContent,
        });
        toast.success("Catatan berhasil ditambahkan!");
      }
      setNoteContent("");
    } catch (err) {
      toast.error("Gagal menambahkan atau memperbarui catatan: " + err.message);
    }
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteContent(note.content);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      toast.success("Catatan berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus catatan: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logout berhasil!");
      navigate("/"); // Arahkan kembali ke halaman login setelah logout
    } catch (error) {
      toast.error("Gagal logout: " + error.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Selamat datang, {auth.currentUser?.email.split("@")[0]}!</p>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/group-list")}>Lihat Grup</button>
        <button onClick={() => navigate("/contact-list")}>
          Lihat Kontak Dosen
        </button>
        <button onClick={() => navigate("/elearning-list")}>
          Lihat E-Learning
        </button>
      </div>

      <h3>Daftar Catatan Penting</h3>
      {isAdmin && (
        <form onSubmit={handleAddNote}>
          <textarea
            placeholder="Tulis catatan penting di sini..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
          />
          <button type="submit">Tambah Catatan</button>
        </form>
      )}

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}
            {isAdmin && (
              <>
                <button onClick={() => handleEditNote(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Hapus</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Daftar Tugas</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Pelajaran:</strong> {task.namaPelajaran} <br />
            <strong>Dosen:</strong> {task.namaDosen} <br />
            <strong>Tugas:</strong> {task.namaTugas} <br />
            <strong>Deadline:</strong>{" "}
            {new Date(task.deadline).toLocaleString()} <br />
            {isAdmin && (
              <>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Hapus</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <>
          <h3>Tambah / Update Tugas</h3>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Nama Pelajaran"
              value={namaPelajaran}
              onChange={(e) => setNamaPelajaran(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nama Dosen"
              value={namaDosen}
              onChange={(e) => setNamaDosen(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nama Tugas"
              value={namaTugas}
              onChange={(e) => setNamaTugas(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              placeholder="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <button type="submit">
              {editingTaskId ? "Update Tugas" : "Tambah Tugas"}
            </button>
          </form>
        </>
      )}

      <nav>
        <h3>Grup Navigasi</h3>
        <ul>
          <li>Beranda</li>
          <li>Tugas</li>
          <li>Profil</li>
          <li>Bantuan</li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
