import React from "react";

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
    return (
        <img
            src="/logo.png"
            alt="AI Viral Ads"
            className={`${className} rounded-full`}
        />
    );
};
