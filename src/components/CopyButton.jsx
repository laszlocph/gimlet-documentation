import { useState, useEffect } from 'react';

const CopyButton = ({ text, style }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const textColorClasses = {
        light: "text-gray-100",
        dark: "text-gray-800",
    }

    return (
        <div className="relative">
            <svg onClick={() => { copyToClipboard(text); handleCopyClick() }} xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer float-left h-6 w-6 ${textColorClasses[style]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {isCopied && (
                <div className="absolute bottom-6 left-0">
                    <div className="p-2 bg-indigo-600 text-white inline-block rounded">
                        Copied!
                    </div>
                </div>
            )}
        </div>);
};

export default CopyButton;

function copyToClipboard(copyText) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copyText);
    } else {
        unsecuredCopyToClipboard(copyText);
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}
