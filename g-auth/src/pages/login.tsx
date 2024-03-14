import { useEffect, useState } from "react";

const url = "http://localhost:5152/login";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async (response: { credential: string }) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });
      setLoading(false);
      const data = await res.json();
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload();
      }
      throw new Error(data?.message || data);
    } catch (error) {
      console.log("log: ", error);
    }
  };

  useEffect(() => {
    /* global google */
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
        callback: handleGoogle,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          // type: "standard",
          theme: "filled_black",
          // size: "small",
          text: "signin_with",
          shape: "pill",
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <h1>Login</h1>

      <button id="loginDiv">Login</button>
    </>
  );
}
