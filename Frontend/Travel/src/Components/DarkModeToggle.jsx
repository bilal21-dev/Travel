import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-xl bg-gray-200 dark:bg-gray-800 rounded-full"
        >
            {darkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-gray-600" />}
        </button>
    );
};

export default DarkModeToggle;
