"use client";
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrash, FaCopy, FaSearch } from 'react-icons/fa';
import Image from "next/image";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwords, setPasswords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(savedPasswords);
  }, []);

  const savePassword = () => {
    if (form.site && form.username && form.password) {
      let updatedPasswords;
      if (editIndex !== null) {
        updatedPasswords = passwords.map((item, index) =>
          index === editIndex ? form : item
        );
        setEditIndex(null);
      } else {
        updatedPasswords = [...passwords, form];
      }
      setPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setForm({ site: '', username: '', password: '' });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deletePassword = (index) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      const updatedPasswords = passwords.filter((_, i) => i !== index);
      setPasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
  };

  const editPassword = (index) => {
    setForm(passwords[index]);
    setEditIndex(index);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This enables smooth scrolling
    });
  };

  const toggleShowPassword = (index) => {
    setPasswords(passwords.map((item, i) =>
      i === index ? { ...item, show: !item.show } : item
    ));
  };

  const copyPassword = (password, index) => {
    navigator.clipboard.writeText(password).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Filter passwords based on search term
  const filteredPasswords = passwords.filter(item =>
    item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen py-6 mt-16">
      <div className="mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-white flex flex-col gap-3 p-4 sm:p-6 md:p-8 my-4 rounded-2xl bg-gray-800 shadow-md">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full px-4 py-2 text-base outline-none border border-green-400 focus:border-green-500 transition-transform duration-200 focus:scale-105 bg-gray-900 text-white"
            type="text"
            name="site"
            placeholder="App / Site Name"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full px-4 py-2 text-base outline-none border border-green-400 focus:border-green-500 transition-transform duration-200 focus:scale-105 bg-gray-900 text-white w-full sm:w-1/2"
              type="text"
              name="username"
              placeholder="Username👤"
            />
            <div className="relative w-full sm:w-1/2">
              <input
                value={form.password}
                onChange={handleChange}
                className="rounded-full px-4 py-2 pr-12 text-base outline-none border border-green-400 focus:border-green-500 transition-transform duration-200 focus:scale-105 bg-gray-900 text-white w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-5 py-3 mt-6 shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-95"
          >
            <Image src="/addPass.gif" alt="Add Password Icon" width={24} height={24} className="w-6 h-6" />
            <span>{editIndex !== null ? "Update Password" : "Add Password"}</span>
          </button>
        </div>

        <div className="text-white flex flex-col gap-3 p-4 sm:p-6 md:p-8 my-4 rounded-2xl bg-gray-800 shadow-md">
          <h2 className="text-lg font-semibold flex items-center justify-between">
            <span>Saved Passwords:</span>
            <div className="relative ml-4 flex-grow">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 rounded-full border border-green-400 focus:border-green-500 transition-transform duration-200 focus:scale-105 bg-gray-900 text-white w-full max-w-[200px] sm:max-w-xs md:max-w-md"
                placeholder="Search..."
              />
            </div>
          </h2>
          {filteredPasswords.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {filteredPasswords.map((item, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded-md shadow-sm flex justify-between items-start">
                  <div className="flex flex-col flex-grow">
                    <strong className="text-green-400">Site:</strong> <span className="break-all">{item.site}</span>
                    <strong className="text-green-400">Username:</strong> <span className="break-all">{item.username}</span>
                    <strong className="text-green-400">Password:</strong>
                    <span className="ml-2 break-all">
                      {item.show ? item.password : "•".repeat(item.password.length)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleShowPassword(index)}
                      className="text-gray-400 hover:text-gray-200 focus:outline-none"
                    >
                      {item.show ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      onClick={() => copyPassword(item.password, index)}
                      className="text-green-400 hover:text-green-500 focus:outline-none"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => editPassword(index)}
                      className="text-blue-400 hover:text-blue-500 focus:outline-none"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deletePassword(index)}
                      className="text-red-400 hover:text-red-500 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {copiedIndex === index && <p className="text-green-500 text-sm mt-1">Copied!</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-3">No passwords saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
