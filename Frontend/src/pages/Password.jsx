import React from "react";
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

  return (
    <div className="flex flex-col min-h-screen w-full p-10 space-y-8 bg-gray-900 text-amber-50">
      {/* Save Password Card */}
      <div className="relative max-w-3xl border-4  rounded-xl shadow-lg shadow-blue-300 hover:shadow-xl transition-shadow duration-1000  p-6">
        <h2 className="text-2xl font-bold mb-6">Save New Password</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[130px_1fr] gap-y-6 gap-x-4 mt-2 relative"
        >
          <div className="absolute top-[-60px] right-0 flex items-center gap-2">
            <label htmlFor="cardName" className="text-sm font-medium">
              Card Name:
            </label>
            <input
              type="text"
              id="cardName"
              placeholder="e.g. Google"
              className="border border-gray-400 rounded px-2 py-1 text-sm w-[160px]"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <label className="text-xl font-medium">Username:</label>
          <Input
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label className="text-xl font-medium">Link/URL:</label>
          <Input
            placeholder="default.com"
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />

          <label className="text-xl font-medium">Password:</label>
          <Input
            placeholder="********"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div></div>
          <Button type="submit">Submit</Button>
        </form>
      </div>

      {/* Saved Passwords Table */}
      <div className="max-w-full  rounded-md p-4 shadow bg-gray-900">
        <div
          className="flex items-center space-x-2 mb-4 text-4xl font-medium text-gray-200 cursor-pointer"
          onClick={toggleView}
        >
          <span>Saved Passwords</span>
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
          <table className="min-w-full table-auto border ">
            <thead className=" font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Url</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedPasswords.map((e, index) => (
                <tr
                  key={index}
                  className="border-b bg-gray-800 hover:bg-gray-900 transition-colors duration-200"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{e.name}</td>
                  <td className="px-6 py-3">{e.url}</td>
                  <td className="px-6 py-3 flex items-center gap-2">
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
                    <button className="text-gray-500 hover:text-gray-700 mr-2">
                      <Pencil />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Password;
