import { useState, useEffect } from 'react';
import * as Fathom from "fathom-client";
import axios from "axios";

const CopyButton = ({ text, style, feedback }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [cnt, setCnt] = useState(0);
    const [feedbackForm, setFeedbackForm] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [thanks, setThanks] = useState(false);

    const handleCopyClick = () => {
        setIsCopied(true);
        setCnt(cnt+1)

        if (feedback && !answered && cnt >= 1) {
            setFeedbackForm(true)
        } else {
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    };

    const answer = (response) => {
        setAnswered(true)
        setFeedbackForm(false)
        setIsCopied(false);
        setThanks(true);
        setTimeout(() => {
            setThanks(false);
        }, 2000);
        postWithAxios(`https://yaml-generator.gimlet.io/feedback`, {response: response}).catch(err => {
            console.error(`Error: ${err}`);
        });
    }

    const textColorClasses = {
        light: "text-gray-100",
        dark: "text-gray-800",
    }

    return (
        <div className="relative">
            <svg onClick={() => { copyToClipboard(text); handleCopyClick(); Fathom.trackGoal("32GVHPPE", 0) }} xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer float-left h-6 w-6 ${textColorClasses[style]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {isCopied && (
                <div className="absolute bottom-10 left-0">
                    <div className="p-2 bg-indigo-600 text-white inline-block rounded">
                        Copied!
                        { feedbackForm &&
                            <div className='mt-4'>
                                Did you get what you need?
                                <div className='mt-2'>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                                        onClick={() => answer("yes")}
                                    >
                                    Yes!
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-1 px-2 rounded-full"
                                        onClick={() => answer("sorta")}
                                    >
                                    Sorta
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-1 px-2 rounded-full"
                                        onClick={() => answer("nah")}>
                                    Nah
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
            {thanks && (
                <div className="absolute bottom-10 left-0">
                    <div className="p-1 bg-indigo-600 text-white inline-block rounded">
                      <img src="/thanks.gif" />
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

const postWithAxios = async (path, body) => {
    try {
      const { data } = await axios
        .post(path, body, {
          withCredentials: false,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      return data;
    } catch (error) {
        console.log(error)
    //   this.onError(error.response);
      throw error.response;
    }
  }
