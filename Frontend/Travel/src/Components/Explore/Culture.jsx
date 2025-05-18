
// import { useEffect, useState } from "react";
// import { FaInfoCircle } from "react-icons/fa";

// const CultureInfo = ({ location }) => {
//     const [info, setInfo] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (!location) return;

//         const fetchCultureData = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(
//                     `https://en.wikipedia.org/api/rest_v1/page/summary/${location}`
//                 );
//                 const data = await response.json();
//                 setInfo(data.extract || "No cultural information found.");
//             } catch (error) {
//                 setInfo("Error fetching culture data.");
//             }
//             setLoading(false);
//         };

//         fetchCultureData();
//     }, [location]); // Runs whenever location changes

//     return (
//         <div className="relative mt-6 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#ffffff] to-[#f7f9fc] dark:from-[#0d0e23] dark:to-[#1b1d38] border border-gray-200 dark:border-gray-700 transition duration-300">
//             {/* Icon and Title */}
//             <div className="flex items-center gap-3 mb-4">
//                 <FaInfoCircle className="text-green-600 text-2xl dark:text-green-400" />
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-green-400">
//                     Cultural Insights
//                 </h2>
//             </div>

//             {/* Content Section */}
//             <div className="relative">
//                 {loading ? (
//                     <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
//                 ) : (
//                     <p className="text-gray-800 dark:text-gray-500 leading-relaxed text-[1rem] tracking-wide">
//                         {info || "Search to get cultural details"}
//                     </p>
//                 )}
//             </div>

//             {/* Background Decoration */}
//             <div className="absolute inset-0 bg-cover opacity-10 rounded-2xl" style={{ backgroundImage: `url('https://source.unsplash.com/600x400/?culture,travel')` }}></div>
//         </div>
//     );
// };

// export default CultureInfo;

import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const CultureInfo = ({ location }) => {
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!location) return;

        const fetchCultureData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${location}`
                );
                const data = await response.json();
                setInfo(data.extract || "No cultural information found.");
            } catch (error) {
                setInfo("Error fetching culture data.");
            }
            setLoading(false);
        };

        fetchCultureData();
    }, [location]);

    return (
  <div>
    {loading ? (
      <p className="text-gray-500">Search to get cultural details</p>
    ) : (
      <div>
        <div className="flex items-center justify-start gap-2 mb-3">
          <FaInfoCircle className="text-yellow-600 text-xl dark:text-yellow-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Cultural Insights
          </h3>
        </div>
        <h4 className="text-center text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          {location}
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base tracking-wide text-center">
          {info || "No cultural information found."}
        </p>
      </div>
    )}
  </div>
);


};

export default CultureInfo;
