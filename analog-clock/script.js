const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const minute = document.querySelector('.minute');
const hours = document.querySelector('.hour');

// Create spikes 
for (let s = 0; s < 60 ; s++) {
    let mSpikeEl = document.createElement('i');
    let sSpikeEl = document.createElement('i');
    mSpikeEl.className = 'spike';
    sSpikeEl.className = 'spike';
    mSpikeEl.style = `--rotate:${s * 6}deg`;
    sSpikeEl.style = `--rotate:${s * 6}deg`;
    mSpikeEl.setAttribute('data-i', s);
    sSpikeEl.setAttribute('data-i', s);

    seconds.append(sSpikeEl);
    minutes.append(mSpikeEl);
}

function getTime() {
    let date = new Date();
    s = date.getSeconds();
    m = date.getMinutes();

    hours.textContent = date.getHours();
    minute.textContent = m;

    minutes.style = `--dRotate:${m * 6}deg`;

    if(s == 0){
        seconds.classList.add('stop-anim');
    } else {
        seconds.classList.remove('stop-anim');
    } 
    if (m == 0) {
        minutes.classList.add('stop-anim');
    } else {
        minutes.classList.remove('stop-anim');
    }

    seconds.style = `--dRotate:${6 * s}deg`;
}
setInterval(getTime, 1000);
getTime();