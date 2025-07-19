import React, { useState } from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import usePasswordStore from "../store/usePasswordStore.js";
import {
  Trash,
  Pencil,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
function Password() {
  const {
    savedPasswords,
    savePasswordData,
    showSavedPasswords,
    isSavingPassword,
    deletePassword,
    updatePassword,
  } = usePasswordStore();
  // Password saving functionality
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    url: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    savePasswordData(formData);
    setFormData({
      name: "",
      username: "",
      url: "",
      password: "",
    });
  };
  // Password generation functionality
  // const [passwordData,setPasswordData] = React.useState({
  //   length: 6,
  //   options:{
  //     uppercase:false,
  //     lowercase:false,
  //     numbers:false,
  //     symbols:false
  //   }
  // })
  // const handleGeneratedPasswordChange = (e) =>{
  //     const {name,value,type,checked} = e.target;
  //     if(type === 'checkbox'){
  //       setPasswordData(prevState =>({
  //         ...prevState,
  //         options: {
  //           ...prevState.options,
  //           [name]: checked
  //         }
  //       }))
  //     }
  //     else{
  //       setPasswordData(prevState => ({
  //         ...prevState,
  //         [name]: value
  //       }));
  //     }
  // }
  // const handleShowGeneratedPassword =(e)=>{
  //   e.preventDefault();
  //   generatePassword(passwordData);
  //   setPasswordData({
  //     length: 6,
  //     options: {
  //       uppercase: false,
  //       lowercase: false,
  //       numbers: false,
  //       symbols: false
  //     }
  //   });
  // }

  //Data visibility functionality
  const [expanded, setExpanded] = React.useState(true); // default to expanded
  const toggleView = () => {
    setExpanded((prev) => !prev);
  };
  React.useEffect(() => {
    if (!isSavingPassword) {
      showSavedPasswords();
    }
  }, [showSavedPasswords, isSavingPassword]);
  //password visibility functionality
  const [visiblePasswords, setVisiblePasswords] = React.useState({});
  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  // Delete password functionality
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      deletePassword(id);
    }
  };
  //Update password functionality
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    username: "",
    url: "",
    password: "",
  });
  const handleEditPassword = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    updatePassword(editData._id, editData);
    setIsEditModalOpen(false);
  };
  const cardRef = React.useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="animate-gradient-password flex min-h-screen w-full flex-col items-center space-y-8 bg-radial from-black to-slate-800 p-10 py-30 text-slate-50">
      {/* Save Password Card */}
      <div
        className="mx-auto w-full max-w-md rounded-2xl border border-slate-700 p-6 shadow-xl inset-shadow-custom transition sm:p-8"
        ref={cardRef}
        style={{
          background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(0,0,240,0.3), transparent 70%)`,
        }}
        onMouseMove={handleMouseMove}
      >
        <h2 className="mb-6 text-3xl font-light text-slate-50 sm:mb-8">
          Save New Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Card Name Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cardName"
              className="text-sm font-medium text-slate-300"
            >
              Card Name:
            </label>
            <input
              type="text"
              id="cardName"
              placeholder="e.g. Google"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200">
              Username:
            </label>
            <Input
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200">
              Link/URL:
            </label>
            <Input
              placeholder="default.com"
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200">
              Password:
            </label>
            <Input
              placeholder="********"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" style={{ marginTop: "20px" }}>
            Submit
          </Button>
        </form>
      </div>

      {/* Saved Passwords Table */}
      <div className="w-90 sm:w-[600px] rounded-xl border-2 border-slate-700 bg-transparent p-4 shadow inset-shadow-custom lg:w-[1000px]">
        <div
          className="mb-4 flex flex-row cursor-pointer items-center space-x-2 text-4xl font-medium text-gray-200"
          onClick={toggleView}
        >
          <h2 className="mb-4 text-2xl font-medium text-slate-50">
            Saved Passwords
          </h2>
          {expanded ? (
            <ChevronDown className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <ChevronRight className="h-6 w-6 transition-transform duration-300" />
          )}
        </div>

        <div
          className={`overflow-hidden overflow-x-auto transition-all duration-500 ${
            expanded ? "max-h-screen" : "max-h-0"
          }`}
        >
          <table className="w-full overflow-hidden rounded-md border border-slate-700 text-left text-sm text-slate-300 inset-shadow-minor">
            <thead className="font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Url</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedPasswords.map((e, index) => (
                <tr key={index} className="transition hover:bg-slate-700/40">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{e.name}</td>
                  <td className="px-6 py-3">{e.username}</td>
                  <td className="px-6 py-3">{e.url}</td>
                  <td className="flex w-[100px] items-center gap-2 px-6 py-3">
                    <span>
                      {visiblePasswords[index] ? e.password : "•••••••••••"}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {visiblePasswords[index] ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </td>

                  <td className="px-6 py-3">
                    <button
                      className="mr-2 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setEditData(e); // e is the row data
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(e._id)}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-slate-700 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Edit Password
            </h2>
            <form onSubmit={handleEditPassword}>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Name"
                className="mb-2 w-full rounded border p-2"
              />
              <input
                type="text"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                placeholder="Username"
                className="mb-2 w-full rounded border p-2"
              />
              <input
                type="url"
                value={editData.url}
                onChange={(e) =>
                  setEditData({ ...editData, url: e.target.value })
                }
                placeholder="URL"
                className="mb-2 w-full rounded border p-2"
              />
              <input
                type="text"
                value={editData.password}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
                placeholder="Password"
                className="mb-4 w-full rounded border p-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Password;
