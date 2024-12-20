import React from "react";

const FooterLanding = () => {
  return (
    <footer className="w-full px-4 sm:px-8 py-4 sm:py-8">
      <div className="flex justify-between gap-5 sm:gap-0 items-start flex-wrap sm:items-center flex-col sm:flex-row">
   <div className="flex justify-center items-center gap-2">
   <img 
    width={30} src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png" alt="" />
   <h1 className="text-[#00ff75] font-bold text-lg">Cloud Menu</h1>
   </div>
        <div>
          <ul className="flex flex-col sm:flex-row sm:gap-2">
            <li>Privacy Policy </li>
            <li> Terms & Service  </li>
            <li>Advertise with Us</li>
            <li>Contact Us </li>
          </ul>
        </div>
        <p className="text-center w-full sm:w-fit">© Copyright 2024. All Rights Reserved.</p>

      </div>
    </footer>
  );
};

export default FooterLanding;
