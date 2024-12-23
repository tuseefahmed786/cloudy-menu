import React from "react";
import { useTranslation } from "react-i18next";

const FooterLanding = () => {
  const { t } = useTranslation();
  return (

  <footer className="bg-gray-100 text-gray-800 pt-8 pb-4 mt-5">
      <div className="px-4 flex-col sm:flex-row items-start sm:px-6 lg:px-8 pt-3 sm:pt-10 flex flex-wrap justify-between">
        {/* Left Section */}
        <div className="flex flex-col  items-start mb-6 md:mb-0">
          <div className="flex gap-2 items-center">
           <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734308759/a7q5yuen7emg6aiv0duo.png" width={24} height={24} alt="logo here" />
            <span className="text-xl font-bold">{t('logo')}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 flex-col-reverse sm:flex-row">
            <a href="https://www.qr.cloudymenu.com/late-cafe-ae" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            {t('footer.tryMenuDemo')}
            </a>
            <a href="https://www.qr.cloudymenu.com/register" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            {t('footer.registerCafe')}
            </a>
          </div>

          <div className="mt-4 flex gap-2 text-gray-600">
            <a href="https://www.instagram.com/cloudymenuae/" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            {/* <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a> */}
            <a href="https://www.linkedin.com/in/tuseef-ahmed-286a9521b/" aria-label="Linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <a href="#plan" className="hover:underline">
          {t('footer.navigationLinks.pricing')}
          </a>
          <a href="#about" className="hover:underline">
          {t('footer.navigationLinks.features')}

          </a>
          <a href="https://www.linkedin.com/in/tuseef-ahmed-286a9521b/" className="hover:underline">
          {t('footer.navigationLinks.careers')}

                    </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm">
        <p>          {t('footer.copyright')}
</p>
      </div>
    </footer>
  );
};

export default FooterLanding;
