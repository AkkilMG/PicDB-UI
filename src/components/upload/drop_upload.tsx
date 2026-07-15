import { enUpload, esUpload, hiUpload, ruUpload } from "@/config/text/upload.text";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

const langTextMap = { en: enUpload, es: esUpload, ru: ruUpload, hi: hiUpload } as const;

export default function DropUpload({ uploadFile }: { uploadFile: (file: any) => Promise<any> }) {
    const [dragging, setDragging] = useState(false);
    const { lang } = useLanguage();
    const data = langTextMap[lang] ?? enUpload;
    useEffect(() => {
        const handleWindowDragOver = (event: any) => {
            setDragging(true);
            event.preventDefault();
        };
        const handleWindowDrop = async (event: any) => {
            setDragging(false);
            await uploadFile(event.dataTransfer);
            event.preventDefault();
        };

        window.addEventListener('dragover', handleWindowDragOver);
        window.addEventListener('drop', handleWindowDrop);

        return () => {
        window.removeEventListener('dragover', handleWindowDragOver);
        window.removeEventListener('drop', handleWindowDrop);
        };
    }, []);
    return (
        <div className={`fixed inset-0 z-50 ${dragging ? 'flex' : 'hidden'} items-center justify-center bg-gray-700 bg-opacity-50`}
          onDragOver={(e) => {setDragging(true); e.preventDefault();}}
          onDragEnter={(e) => {setDragging(true); e.preventDefault();}}
          onDragLeave={(e) => {setDragging(false); e.preventDefault();}}
          onDrop={(e) => {setDragging(false); e.preventDefault();}}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img draggable={false} src="assets/icons/corner.svg" style={{left: "34px", top: "34px", position: "absolute"}} alt="corner" />
            <img draggable={false} src="assets/icons/corner.svg" style={{right: "34px", top: "34px", position: "absolute", transform: "rotate(90deg)"}} alt="corner" />
            <img draggable={false} src="assets/icons/corner.svg" style={{left: "34px", bottom: "34px", position: "absolute", transform: "rotate(270deg)"}} alt="corner" />
            <img draggable={false} src="assets/icons/corner.svg" style={{right: "34px", bottom: "34px", position: "absolute", transform: "rotate(180deg)"}} alt="corner" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-3xl">{data.drop}</span>
            </div>
          </div>
        </div>
    );
}