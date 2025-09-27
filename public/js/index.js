// Show/hide profile popup menu
document.getElementById('profileMenu').addEventListener('click', function () {
  let popup = document.getElementById('profilePopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', function(e) {
  let popup = document.getElementById('profilePopup');
  let menu = document.getElementById('profileMenu');
  if (!menu.contains(e.target) && !popup.contains(e.target)) {
    popup.style.display = 'none';
  }
});
