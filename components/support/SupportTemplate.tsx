import React from "react";
import Image from "next/image";
import Link from "next/link";

const SupportTemplate = () => {
  const sample = null;
  return (
    <div
      className={`flex flex-col items-center gap-12 py-6 text-gray-700 dark:text-white xs:px-3 `}
    >
      <h1 className={`text-4xl font-bold `}>Support</h1>
      <div className={`relative w-36 h-36`}>
        <Image src={`/soullink_logo.png`} alt={`soullink`} fill={true} />
      </div>
      <div className={`flex flex-col items-start gap-4 px-5 xs:px-1`}>
        <div className={`flex flex-col items-start gap-1`}>
          <h2 className={`mb-1 text-2xl font-bold`}>Contact</h2>
          <p className={`text-lg font-semibold`}>soullink_info@gmail.com</p>
          <Link
            className={`text-lg font-semibold underline`}
            target={`_blank`}
            href={`https://twitter.com/soullink_info`}
          >
            @soullink_info
          </Link>
        </div>
        <div className={`flex flex-col items-start gap-1`}>
          <h3 className={`text-md font-semibold`}>Questions or Assistance:</h3>
          <p className={`text-md font-medium`}>
            For any inquiries or help with our services, please contact us at
            soullink_info@gmail.com or through our twitter account.
          </p>
        </div>
        <div className={`flex flex-col items-start gap-1`}>
          <h3 className={`text-md font-semibold`}>Report Abuse or Errors:</h3>
          <p className={`text-md font-medium`}>
            To report abusive behavior or technical errors, email us at
            soullink_info@gmail.com. Your safety and a smooth experience on our
            platform are our priorities.
          </p>
        </div>
        <div className={`flex items-start gap-1 mt-5`}>
          <p className={`text-sm`}>developed by </p>
          <Link
            className={`text-sm font-semibold underline`}
            href={`https://github.com/0teklee`}
            target={`_blank`}
          >
            @0teklee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportTemplate;
