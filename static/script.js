let mediaRecorder;
let audioChunks=[];

const startBtn =
document.getElementById("startBtn");

const stopBtn =
document.getElementById("stopBtn");

startBtn.onclick = async () => {

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