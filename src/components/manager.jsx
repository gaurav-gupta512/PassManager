// import React from 'react'
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordReveal = useRef();
  const [form, setform] = useState({
    website: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }

    // return () => {
    //   second
    // }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      passwordReveal.current.type = "password";
      ref.current.src = "eye.png";
    } else {
      passwordReveal.current.type = "text";
      ref.current.src = "eyecross.png";
    }
  };

  const savePassword = () => {
    if( form.website.length >= 3 && form.username.length >= 3 && form.username.length >= 3 ){

      // console.log(form);
      setpasswordArray([...passwordArray,{ ...form , id : uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray,{ ...form , id : uuidv4()}]));
      // console.log([...passwordArray, form]);
      setform({
        website: "",
        username: "",
        password: "",
      })
    } else{
      alert('Characters in each field must be atleast 3')
    }
  };

  const resetFields = (event) => {
    setform({ ...form, [event.target.name]: event.target.value });
  };

  const copyText = (text) => {
    alert('Copied to Clipboard!')
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    let approved = confirm('Do you want to edit the selected column? Details will be copied to the form')
    if (approved){
      setform(passwordArray.find(data => data.id == id))
    }
  }

  const deletePassword = (id) => {
    let approved = confirm('Delete ?')
    if (approved){
      setpasswordArray(passwordArray.filter(data => data.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(data => data.id!==id)))
    }
  }
  

  return (
    <>
      <div className="min-w-[400px] p-5 mx-auto device md:mycomponents">
        <p className="text-blue-800 text-lg md:text-2xl font-bold text-center pb-2">Your Personal Password Manager</p>
        <div className="flex flex-col p-3 gap-5">
          <input
            name="website"
            value={form.website}
            onChange={resetFields}
            placeholder="Website Name"
            type="text"
            className="text-black rounded-2xl h-9 w-full border-2 border-violet-400 px-2 py-1"
          />
          <div className="flex flex-col md:flex-row justify-around gap-5">
            <input
              name="username"
              value={form.username}
              onChange={resetFields}
              placeholder="Username"
              type="text"
              className="text-black h-9 py-1 px-2 rounded-2xl border-2 border-violet-400 w-full"
            />
            <div className="relative">
              <input
                ref={passwordReveal}
                name="password"
                value={form.password}
                onChange={resetFields}
                placeholder="Password"
                type="password"
                className="text-black h-9 px-2 py-1 rounded-2xl border-2 border-violet-400 w-full"
              />
              <span
                className="absolute right-3 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img src="eye.png" ref={ref} width={25} alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex self-center justify-center items-center border-blue-900 border-2 bg-blue-200 rounded-2xl p-1 px-2 w-fit hover:bg-blue-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <span className="text-sm">Save Password</span>
          </button>
        </div>
        <h2 className="mx-auto text-xl pt-2 pb-5 text-center">Saved Passwords</h2>
        {passwordArray.length === 0 && (
          <div className="text-sm text-center">
            No passwords to show , Get started with adding one
          </div>
        )}
        {passwordArray.length !== 0 && (
          <table className="table-auto mx-auto w-full rounded-xl overflow-hidden">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="py-2 border-white border-2 text-center">
                  Website
                </th>
                <th className="py-2 border-white border-2 text-center">
                  Username
                </th>
                <th className="py-2 border-white border-2 text-center">
                  Password
                </th>
                <th className="py-2 border-white border-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-violet-50">
              {passwordArray.map((data, index) => {
                return (
                  <tr key={index}>
                    <td
                      className="py-1 w-1/2 border-white border hover:underline decoration-2 
                    "
                    >
                      <div className="flex px-3 justify-between items-center">
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{data.website}</span>
                        </a>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(data.website)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            style={{ height: 25, width: 25 }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border-white border w-1/4 ">
                      <div className="flex px-3 justify-between items-center">
                        <span>{data.username}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(data.username)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            style={{ height: 25, width: 25 }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border-white border w-1/6">
                      <div className="flex px-3 justify-between items-center">
                        <span>{'*'.repeat(data.password.length)}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => copyText(data.password)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xpgofwru.json"
                            trigger="hover"
                            style={{ height: 25, width: 25 }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-1 border-white border w-20">
                      <div className="flex px-3 justify-around items-center">
                        {/* <span>{data.password}</span> */}
                        <div
                          className="cursor-pointer"
                          onClick={() => editPassword(data.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ height: 25, width: 25 }}
                          ></lord-icon>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => deletePassword(data.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ height: 25, width: 25 }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

// localStorage.removeItem("passwords")
export default Manager;
