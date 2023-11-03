"use client";

import { useEffect, useState } from "react";
import { authModalState } from "@/app/atom/authModalAtom";
// import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firebase } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

const SingUp = () => {
  // const [loading, setLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputs.displayName || inputs.email || inputs.password) alert("Plz fill all fields");
    try {
      toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      // router.push('/');
      if (!newUser) {
        console.log("error");
        return;
      }
      
      const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};
      
      await setDoc(doc(firebase, "users", newUser.user.uid), userData);

      if (newUser) {
        router.push("/");
      }
      // if (user) {
      //   console.log(user);
      // }
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    alert(error?.message);
  }, [error]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(inputs);
  };

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };

  return (
    <form
      className="space-y-6 px-6 pb-4"
      onSubmit={handleRegister}
      method="POST"
    >
      <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm text-start font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          className="
    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm text-start font-medium block mb-2 text-gray-300"
        >
          Display Name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          className="
    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm text-start font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="
    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
"
          placeholder="*******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
    "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-sm font-medium text-gray-300">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Log In
        </a>
      </div>
    </form>
  );
};

export default SingUp;
