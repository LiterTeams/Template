"use client"
 
import Error from "next/error";
 
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error title="Page Not Found" statusCode={404} />
        <div className="fixed -z-[5] left-0 top-0 w-screen h-screen bg-gradient-to-tr from-indigo-600/0 to-purple-500/15" />
      </body>
    </html>
  );
}