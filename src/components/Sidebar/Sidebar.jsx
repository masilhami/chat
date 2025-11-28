import React, {useContext, useEffect, useState} from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets';
import {Context} from '../../context/Context';

const Sidebar = () => {
    // 1. Mengubah default state menjadi true (extended)
    const [extended, setExtended] = useState(true); 
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    // Saran: Efek ini dapat digunakan untuk menyesuaikan margin-left elemen <main>
    useEffect(() => {
        const mainElement = document.querySelector('.main');
        if (mainElement) {
            // Logika untuk mengubah margin-left pada elemen .main
            mainElement.style.marginLeft = extended ? '260px' : '60px';
        }

        // Handle resize untuk mobile (jika Anda ingin sidebar terbuka/tertutup berdasarkan lebar)
        const handleResize = () => {
             if (window.innerWidth <= 900) {
                 // Set extended ke false jika lebar layar kecil (Opsional)
                 // setExtended(false); 
                 // Pastikan margin main di mobile adalah 0 (ditangani di Main.css)
             }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [extended]);


    return (
        <aside className={`sidebar ${extended ? 'extended' : 'collapsed'}`}>
            <div className={`top`}>
                <div className="menu" onClick={() => setExtended(prev => !prev)}>
                    <img src={assets.menu_icon} alt="Menu Icon"/>
                </div>
                
                {/* Tombol New Chat */}
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Plus Icon"/>
                    {/* Teks hanya muncul jika diperluas */}
                    <p className={`${extended ? 'block' : 'none'}`}>New Chat</p> 
                </div>

                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} key={index} className="recent-entry">
                                    <img src={assets.message_icon} alt="Message Icon"/>
                                    {/* Batasi panjang teks riwayat */}
                                    <p className="recent-entry-p">{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}
                    </div>
                    : null
                }
            </div>
            
            <div className={`bottom`}>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>Help</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>Activity</p>
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon"/>
                    <p className={`${extended ? 'block' : 'none'}`}>Settings</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;