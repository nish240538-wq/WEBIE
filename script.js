const followBtn = document.getElementById('followBtn');

followBtn.addEventListener('click', () => {
    if (followBtn.innerText === "Follow") {
        followBtn.innerText = "Following";
        followBtn.classList.add('following');
    } else {
        followBtn.innerText = "Follow";
        followBtn.classList.remove('following');
    }
});