import React from 'react';

function SocialIcon() {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100064752546597',
      icon: 'bi-facebook',
      color: 'hover:text-blue-500',
      glow: 'group-hover:shadow-blue-500/30'
    },
    {
      name: 'WhatsApp',
      url: 'https://chat.whatsapp.com/CKd3GPPaYVP5X9E1JOhfyV',
      icon: 'bi-whatsapp',
      color: 'hover:text-green-500',
      glow: 'group-hover:shadow-green-500/30'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abdelmoniem-ahmed-3751761b7/',
      icon: 'bi-linkedin',
      color: 'hover:text-sky-500',
      glow: 'group-hover:shadow-sky-500/30'
    },
    {
      name: 'Messenger',
      url: 'https://www.facebook.com/profile.php?id=100007656874900',
      icon: 'bi-messenger',
      color: 'hover:text-blue-400',
      glow: 'group-hover:shadow-blue-400/30'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/hgagq',
      icon: 'bi-telegram',
      color: 'hover:text-sky-400',
      glow: 'group-hover:shadow-sky-400/30'
    }
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 overflow-x-auto no-scrollbar">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noreferrer"
          className="group relative flex-shrink-0"
          title={social.name}
        >
          <div className={`
            w-9 h-9 sm:w-12 sm:h-12 
            flex items-center justify-center 
            rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md 
            border border-white/10 
            text-white/70 text-lg sm:text-2xl
            transition-all duration-500 
            group-hover:-translate-y-2 group-hover:bg-white/10 
            group-hover:border-white/20 group-hover:text-white
            ${social.color} shadow-lg ${social.glow}
          `}>
            <i className={`bi ${social.icon}`}></i>
          </div>

          {/* Subtle bottom glow on hover */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-current opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500"></div>
        </a>
      ))}
    </div>
  );
}

export default SocialIcon;