import React,{useState} from "react";
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
    updatePassword
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
  const handleEditPassword = (e) =>{
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    updatePassword(editData._id, editData);
    setIsEditModalOpen(false);
  }
  return (
    <div className="flex flex-col items-center min-h-screen w-full p-10  py-20 space-y-8  bg-radial from-black to-slate-800 text-slate-50 animate-gradient-password">
      {/* Save Password Card */}
      <div className="relative w-[600px] bg-slate-800 border border-slate-700 rounded-2xl shadow-xl  p-8 transition">
        <h2 className="text-2xl font-bold text-slate-50 mb-8">
          Save New Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[130px_1fr] gap-y-6 gap-x-4 mt-2 relative"
        >
          {/* Card Name Field at Top Right */}
          <div className="absolute top-[-60px] right-0 flex items-center gap-2">
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
              className="border border-slate-600 rounded-md px-3 py-1 text-sm bg-slate-700 text-slate-100 placeholder-slate-400 w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <label className="text-lg font-medium text-slate-200">
            Username:
          </label>
          <Input
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="px-3 bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 focus:ring-2 focus:ring-blue-500"
          />

          {/* URL */}
          <label className="text-lg font-medium text-slate-200">
            Link/URL:
          </label>
          <Input
            placeholder="default.com"
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="px-3 bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <label className="text-lg font-medium text-slate-200">
            Password:
          </label>
          <Input
            placeholder="********"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-3 bg-slate-700 text-slate-100 placeholder-slate-400 border border-slate-600 focus:ring-2 focus:ring-blue-500"
          />

          <div></div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition disabled:opacity-50"
          >
            Submit
          </Button>
        </form>
      </div>

      {/* Saved Passwords Table */}
      <div className="w-[600px] lg:w-[1000px]  rounded-md p-4 shadow bg-slate-800">
        <div
          className="flex items-center space-x-2 mb-4 text-4xl font-medium text-gray-200 cursor-pointer"
          onClick={toggleView}
        >
          <h2 className="text-2xl font-bold text-slate-50 mb-4">
            Saved Passwords
          </h2>
          {expanded ? (
            <ChevronDown className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <ChevronRight className="w-6 h-6 transition-transform duration-300" />
          )}
        </div>

        <div
          className={`overflow-x-auto transition-all duration-500 overflow-hidden ${
            expanded ? "max-h-screen" : "max-h-0"
          }`}
        >
          <table className="w-full text-left text-sm text-slate-300 border border-slate-700 rounded-md overflow-hidden">
            <thead className=" font-semibold">
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
                <tr key={index} className="hover:bg-slate-700/40 transition">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{e.name}</td>
                  <td className="px-6 py-3">{e.username}</td>
                  <td className="px-6 py-3">{e.url}</td>
                  <td className="px-6 py-3 flex w-[100px] items-center gap-2">
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
                      className="text-gray-500 hover:text-gray-700 mr-2"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-700 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
                className="mb-2 p-2 w-full border rounded"
              />
              <input
                type="text"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                placeholder="Username"
                className="mb-2 p-2 w-full border rounded"
              />
              <input
                type="url"
                value={editData.url}
                onChange={(e) =>
                  setEditData({ ...editData, url: e.target.value })
                }
                placeholder="URL"
                className="mb-2 p-2 w-full border rounded"
              />
              <input
                type="text"
                value={editData.password}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
                placeholder="Password"
                className="mb-4 p-2 w-full border rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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
