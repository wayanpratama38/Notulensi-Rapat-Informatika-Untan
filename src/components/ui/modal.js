'use client'
import {useRef,useEffect} from "react";


export const Modal = ({
    isOpen,
    closeModal,
    onClose,
    children,
    className,
    showCloseButton = true,
    isFullscreen = false,
    title
}) => {
    // Use closeModal if provided, otherwise fall back to onClose
    const handleClose = closeModal || onClose;
    
    const modalRef = useRef(null);

    useEffect(()=> {
        const handleEscape = (event) => {
            if(event.key === 'Escape') { 
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown",handleEscape);
        }

        return () => {
            document.removeEventListener("keydown",handleEscape);
        }
    },[isOpen,handleClose]);

    useEffect(()=>{
        if (isOpen){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    },[isOpen])

    if (!isOpen) return null;

    const contentClasses = isFullscreen
        ? "w-full h-full"
        : "relative w-full max-w-md mx-auto rounded-lg bg-gray-900 p-6 shadow-lg border border-gray-800";   

    return(
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-50">
        {!isFullscreen && (
            <div
            className="fixed inset-0 h-full w-full bg-gray-900/70 backdrop-blur-[2px]"
            onClick={handleClose}
            ></div>
        )}
        <div
            ref={modalRef}
            className={`${contentClasses} ${className || ''}`}
            onClick={(e) => e.stopPropagation()}
        >
            {title && (
                <div className="mb-4 text-xl font-semibold dark:text-gray-200 text-black">{title}</div>
            )}
            {showCloseButton && (
            <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-200"
            >
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                    fill="currentColor"
                />
                </svg>
            </button>
            )}
            <div>{children}</div>
        </div>
    </div>
    )
}