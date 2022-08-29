const form = document.getElementById('generate-form')
const qr = document.getElementById('qrcode')

const onGenerateSubmit = (e) => {
    e.preventDefault()
    clearUI() //clears the UI first before generating a fresh qr code
    const url = document.getElementById('url').value //we need to get the value cos it's an input
    const size = document.getElementById('size').value
    
    if (url === ""){
        alert("Please enter a URL")
    }else {
        showSpinner() //do this first
        setTimeout(() => {
            hideSpinner() //do the following after 
            generateQrCode(url, size)
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src
                createSaveBtn(saveUrl)
            }, 50);
        }, 1000);
    }
}

const generateQrCode = (url, size) => {
    const qrCode = new QRCode('qrcode', { //'qrcode' is the id
        text: url,
        width: size,
        height: size
    })
}
const showSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = "block"
}
const hideSpinner = () => {
    const spinner = document.getElementById('spinner')
    spinner.style.display = "none"
}

const clearUI = () => {
    qr.innerHTML = "";
    const saveLink = document.getElementById('save-link')
    // if (saveLink) {
    //     return saveLink.remove();
    // } OR..
    if (saveLink) saveLink.remove()
}

const createSaveBtn = (saveURL) => {
    const link = document.createElement('a')
    link.id = "save-link"
    link.classList = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
    link.href = saveURL;
    link.innerText = "Save Image"
    link.download = 'qrcode' //the id
    document.getElementById('generated').appendChild(link)
}

hideSpinner()

form.addEventListener('submit', onGenerateSubmit)