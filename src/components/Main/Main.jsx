import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";

const Main = () => {
    // Mengambil nilai dan fungsi dari Context
    // Catatan: Untuk riwayat chat penuh, Anda perlu mengganti ini dengan 'chatHistory'
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    
    // Ref untuk menggulir hasil ke bawah secara otomatis
    const resultRef = useRef(null);
    
    // State untuk baris textarea (Responsif)
    const [rows, setRows] = useState(1);

    // Ikon AI: Asumsikan Anda memiliki ikon bintang/gemini untuk AI
    const aiIcon = assets.gemini_icon || assets.star_icon; 

    // --- LOGIC UNTUK AVATAR PENGGUNA (Ganti dengan logika login Anda) ---
    const loggedInUserPhotoUrl = ""; // Ganti dengan URL FOTO PENGGUNA ASLI
    const defaultUserIcon = assets.user_icon; // Avatar default jika tidak login
    
    // Tentukan avatar yang akan ditampilkan
    const userAvatarToDisplay = loggedInUserPhotoUrl ? loggedInUserPhotoUrl : defaultUserIcon;
    // -------------------------------------------------------------------


    // Efek untuk menyesuaikan baris textarea berdasarkan ukuran layar
    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2); 
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    // Efek untuk menggulir ke bawah saat chat bertambah
    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData, loading]); 

    // Fungsi untuk memanggil onSent saat tombol Enter ditekan
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            onSent();
        }
    };

    return (
        <main className="main">
            {/* Navigasi disembunyikan di desktop oleh CSS, hanya muncul di mobile */}
            <nav className="nav">
                <p>Isnen AI</p> 
                <img src={userAvatarToDisplay} alt="User Icon" className="user-nav-avatar"/>
            </nav>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">
                            {/* AVATAR DI HALAMAN HOME */}
                            <img src={userAvatarToDisplay} alt="User Avatar" className="greet-avatar"/>
                            
                            <p className='greet-title'>Assalamualaikum...</p>
                            <p className='greet-text'>Saya asisten pintar <strong>Isnen AI</strong>, siap membantumu. Apa yang ingin kamu tanyakan hari ini?</p>
                        </div>
                        <div className="empty-home-content">
                            {/* Area Kosong */}
                        </div>
                    </>
                    :
                    // ------------------------------------------
                    // TAMPILAN CHAT BUBBLE (Perlu Logic Mapping untuk Full History)
                    // ------------------------------------------
                    <div className='result' ref={resultRef}>
                        
                        {/* 1. BUBBLE CHAT PENGGUNA (Prompt) */}
                        <div className="chat-message user-message">
                            <div className="message-content">
                                <p>{recentPrompt}</p> 
                            </div>
                            <div className="message-meta">
                                {/* Avatar Pengguna dengan Verified Badge */}
                                <img src={userAvatarToDisplay} alt="User Icon" className="chat-avatar"/>
                                <span className="verified-badge verified-user"></span> 
                            </div>
                        </div>
                        
                        {/* 2. BUBBLE CHAT AI (Jawaban) */}
                        <div className="chat-message ai-message">
                            <div className="message-meta">
                                {/* Avatar AI dengan Online Indicator */}
                                <img className="chat-avatar" src={aiIcon} alt="AI Icon"/>
                                <span className="online-indicator"></span> 
                            </div>
                            <div className="message-content">
                                {loading ?
                                    <div className='loader'>
                                        <hr/>
                                        <hr/>
                                        <hr/>
                                    </div>
                                    :
                                    <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                                }
                            </div>
                        </div>
                        
                        {/* 3. INDIKATOR SEDANG MENGETIK (Typing Indicator) */}
                        {loading && (
                            <div className="typing-indicator chat-message ai-message">
                                 <div className="message-meta">
                                     <img className="chat-avatar" src={aiIcon} alt="AI Icon"/>
                                     <span className="online-indicator"></span>
                                 </div>
                                 <div className="message-content typing-dots">
                                     <span></span>
                                     <span></span>
                                     <span></span>
                                 </div>
                            </div>
                        )}
                    </div>
                }
                
                {/* Bagian Bawah Input */}
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea
                            rows={rows}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            value={input}
                            type="text"
                            placeholder="Ketik pertanyaanmu di sini..."
                        />
                        <div className="icon-container">
                            <button title="Upload Image"><img src={assets.gallery_icon} alt="Gallery"/></button>
                            <button title="Voice Input"><img src={assets.mic_icon} alt="Mic"/></button>
                            <button 
                                type="submit" 
                                onClick={onSent} 
                                disabled={!input.trim()}
                                className={input.trim() ? 'active-send' : 'disabled-send'}
                            >
                                <img src={assets.send_icon} alt="Send"/> 
                            </button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        <strong>Isnen AI</strong> dapat menampilkan informasi yang tidak akurat, jadi selalu periksa kembali jawabannya.
                        <a href="#">Privasi Anda dan Isnen AI</a>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;