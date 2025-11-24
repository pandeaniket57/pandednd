document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// update WhatsApp + Instagram behavior when a training card is clicked
const waLink = document.getElementById('whatsapp-link');
const igLink = document.getElementById('instagram-link');

document.addEventListener('click', function(e) {
  const card = e.target.closest && e.target.closest('.program');
  if (!card) return;
  const subject = card.getAttribute('data-subject') || 'your services';
  const text = `Hi, I'm interested in ${subject}. Please share details.`;

  if (waLink) {
    waLink.href = `https://wa.me/917447560011?text=${encodeURIComponent(text)}`;
  }

  if (igLink && navigator.clipboard) {
    // copy message to clipboard so user can paste into IG DM
    navigator.clipboard.writeText(text).then(() => {
      igLink.title = 'Message copied — open Instagram and paste in DM';
      // ensure instagram profile link is set
      igLink.href = 'https://instagram.com/pandedesigndev';
    }).catch(() => {
      // fallback: still set profile link even if clipboard fails
      igLink.href = 'https://instagram.com/pandedesigndev';
    });
  } else if (igLink) {
    igLink.href = 'https://instagram.com/pandedesigndev';
  }
});

// optional: when instagram button is clicked try to open app then fallback to web
if (igLink) {
  igLink.addEventListener('click', function(e){
    // attempt to open Instagram app (mobile). Fallback to web profile after short delay.
    const username = 'pandedesigndev';
    const appUrl = `instagram://user?username=${username}`;
    const webUrl = igLink.href || `https://instagram.com/${username}`;
    // try open app
    window.location = appUrl;
    // fallback to web after 500ms
    setTimeout(() => { window.open(webUrl, '_blank'); }, 500);
  });
}