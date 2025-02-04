import React from "react";
import FileUpload from "../components/FileUpload";

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4 p-5"> Home</h1>
      <h1 className="text-2xl font-bold text-center my-4">Email Upload</h1>
      <FileUpload />
    </div>
  );
};

export default Home;
