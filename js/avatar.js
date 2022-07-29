const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview-image');
const fileChooserHouse = document.querySelector('#images');
const previewHouse = document.querySelector('.ad-form__photo');
const adFormPhotoContainer=document.querySelector('.ad-form__photo-container');
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES
    .some((it) =>(
      fileName.endsWith(it)
    ));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
fileChooserHouse.addEventListener('change', () => {
  for(let i=0;i<=fileChooserHouse.files.length-1;i++){
    const file = fileChooserHouse.files[i];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES
      .some((it) =>(
        fileName.endsWith(it)
      ));
    if (matches) {
      const ImageCopy = previewHouse.cloneNode(true);
      previewHouse.remove();
      ImageCopy.innerHTML=`<img src="${URL.createObjectURL(file)}" class="ad-form__image-hotel" alt="Фотографии отеля" width="70" height="70">`;
      adFormPhotoContainer.appendChild(ImageCopy);
    }
  }
});
