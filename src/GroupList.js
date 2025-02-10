// src/GroupList.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [namaPelajaran, setNamaPelajaran] = useState("");
  const [namaDosen, setNamaDosen] = useState("");
  const [linkWA, setLinkWA] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setIsAdmin(user.email === "admin@gmail.com");
    }

    const unsubscribeGroups = onSnapshot(
      collection(db, "groups"),
      (snapshot) => {
        const groupList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupList);
      }
    );

    return () => {
      unsubscribeGroups();
    };
  }, []);

  const handleAddGroup = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk menambahkan grup.");
      return;
    }

    try {
      if (editingGroupId) {
        await updateDoc(doc(db, "groups", editingGroupId), {
          namaPelajaran,
          namaDosen,
          linkWA,
        });
        setEditingGroupId(null);
        toast.success("Grup berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "groups"), {
          namaPelajaran,
          namaDosen,
          linkWA,
        });
        toast.success("Grup berhasil ditambahkan!");
      }
      setNamaPelajaran("");
      setNamaDosen("");
      setLinkWA("");
    } catch (err) {
      toast.error("Gagal menambahkan atau memperbarui grup: " + err.message);
    }
  };

  const handleEditGroup = (group) => {
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk mengedit grup.");
      return;
    }
    setEditingGroupId(group.id);
    setNamaPelajaran(group.namaPelajaran);
    setNamaDosen(group.namaDosen);
    setLinkWA(group.linkWA);
  };

  const handleDeleteGroup = async (groupId) => {
    if (!isAdmin) {
      toast.error("Anda tidak memiliki izin untuk menghapus grup.");
      return;
    }
    try {
      await deleteDoc(doc(db, "groups", groupId));
      toast.success("Grup berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus grup: " + err.message);
    }
  };

  return (
    <div>
      <h2>Daftar Grup</h2>
      {isAdmin && (
        <form onSubmit={handleAddGroup}>
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
            placeholder="Link Grup WA"
            value={linkWA}
            onChange={(e) => setLinkWA(e.target.value)}
            required
          />
          <button type="submit">
            {editingGroupId ? "Update Grup" : "Tambah Grup"}
          </button>
        </form>
      )}

      <h3>Daftar Grup</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <strong>Pelajaran:</strong> {group.namaPelajaran} <br />
            <strong>Dosen:</strong> {group.namaDosen} <br />
            <strong>Link WA:</strong>{" "}
            <a href={group.linkWA} target="_blank" rel="noopener noreferrer">
              {group.linkWA}
            </a>{" "}
            <br />
            {isAdmin && (
              <>
                <button onClick={() => handleEditGroup(group)}>Edit</button>
                <button onClick={() => handleDeleteGroup(group.id)}>
                  Hapus
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
