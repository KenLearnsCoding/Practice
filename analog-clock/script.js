const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const minute = document.querySelector('.minute');
const hours = document.querySelector('.hour');

// Create spikes 
for (lets = 0; s <60; s++) {
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

    minute.style = `--dRotate: ${m * 6}deg`;

    if(s==0){
        seconds.classList.add('stop-amin');
    } else {
        seconds.classList.remove('stop-amin');
    } 
    if (m == 0) {
        minutes.classList.add('stop-amin');
    } else {
        minutes.classList.remove('stop-amin');
    }

    seconds.style = `--dRotate:${s * 6}deg`;
}