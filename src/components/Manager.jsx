import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      toast("🔑 Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
    } else {
      toast("❌ Error: Password not saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    toast("✔ Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    let c = confirm("Do you really want to delete this password!");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("📄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="p-2 md:mycontainer min-h-[81.5vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500 ">&lt;</span>
          Pass
          <span className="text-green-500 ">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
          <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                className="rounded-full border border-green-500 w-full px-4 py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
              <span
                onClick={showPassword}
                className="absolute right-[3px] top-[2px] cursor-pointer"
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="/icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4 flex justify-center items-center pb-5">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="flex justify-center items-center text-green-600 font-semibold text-lg">Oops, no password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2 ">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex justify-center items-center gap-3">
                          <a
                            href={item.site}
                            target="_blank"
                            className="cursor-pointer"
                          >
                            {item.site}
                          </a>
                          <img
                            className="w-5 cursor-pointer"
                            src="icons/copy.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.site);
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex justify-center items-center gap-3">
                          {item.username}
                          <img
                            className="w-5 cursor-pointer"
                            src="icons/copy.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.username);
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className=" flex justify-center items-center gap-3">
                          {item.password}
                          <img
                            className="w-5 cursor-pointer"
                            src="icons/copy.svg"
                            alt=""
                            onClick={() => {
                              copyText(item.password);
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/oqeixref.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
