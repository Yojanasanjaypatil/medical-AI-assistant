let mediaRecorder;
let audioChunks=[];

const startBtn =
document.getElementById("startBtn");

const stopBtn =
document.getElementById("stopBtn");

startBtn.onclick = async () => {

    document.getElementById("status-dot").className =
    "dot recording";

    document.getElementById("status-text").innerText =
    "Recording...";

    const stream =
    await navigator.mediaDevices
    .getUserMedia({audio:true});

    mediaRecorder =
    new MediaRecorder(stream);

    audioChunks=[];

    mediaRecorder.ondataavailable =
    e => {
        audioChunks.push(e.data);
    };

    mediaRecorder.start();
};

stopBtn.onclick = () => {

    mediaRecorder.stop();

    document.getElementById("status-dot").className =
    "dot stopped";

    document.getElementById("status-text").innerText =
    "Recording Stopped";

    mediaRecorder.onstop = async () => {

        const blob =
        new Blob(audioChunks,
        {type:"audio/wav"});

        const formData =
        new FormData();

        formData.append(
            "audio",
            blob,
            "audio.wav"
        );

        const response =
        await fetch("/upload",{
            method:"POST",
            body:formData
        });

        const data =
        await response.json();

        document.getElementById(
        "transcript").innerText =
        data.transcript;

        document.getElementById(
        "summary").innerText =
        data.summary;
    };
};