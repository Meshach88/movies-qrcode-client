import { useEffect, useState } from "react";
import axios from 'axios';
import QRCode from "react-qr-code";

const QRCodePage = () => {
    const [qrData, setQrData] = useState<{ qrCode: string, url: string } | null>(null);

    const fetchQRCode = async () => {
        try {
            const response = await axios.get("http://localhost:3000/movies/qrcode");
            setQrData(response.data);
        } catch (error) {
            console.error("Error fetching QR Code:", error);
        }
    };

    useEffect(() => {
        fetchQRCode(); 
        const interval = setInterval(fetchQRCode, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Scan the QR Code</h1>
            {qrData ? (
                <>
                <QRCode value={qrData.url} size={200} />
                <p className="mt-2 text-lg">Scan to view movies</p>
                </>
            ) : (
                <p>Loading QR Code ...</p>
            )
            }
        </div>
    );
};

export default QRCodePage;